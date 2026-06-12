import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseVehicleCsv } from './shared/vehicleCsv.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3001);
const distDir = path.join(__dirname, 'dist');
const allowedOrigins = new Set([
  'https://nelsoncalidad15-ops.github.io',
  'http://localhost:3000',
]);

const CACHE_TTL_MS = Number(process.env.SHEET_CACHE_TTL_MS || 60000);
const cache = {
  expiresAt: 0,
  vehicles: [],
};

async function fetchVehiclesFromSheet() {
  const sheetUrl = process.env.SHEET_CSV_URL;

  if (!sheetUrl) {
    throw new Error('Falta la variable SHEET_CSV_URL en el backend.');
  }

  const response = await fetch(`${sheetUrl}${sheetUrl.includes('?') ? '&' : '?'}t=${Date.now()}`);
  if (!response.ok) {
    throw new Error(`Google Sheets respondio con estado ${response.status}.`);
  }

  const csvText = await response.text();
  return parseVehicleCsv(csvText);
}

async function getVehicles() {
  if (cache.vehicles.length > 0 && Date.now() < cache.expiresAt) {
    return cache.vehicles;
  }

  const vehicles = await fetchVehiclesFromSheet();
  cache.vehicles = vehicles;
  cache.expiresAt = Date.now() + CACHE_TTL_MS;
  return vehicles;
}

app.use(express.json());
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/vehicles', async (_req, res) => {
  try {
    const vehicles = await getVehicles();
    res.set('Cache-Control', 'no-store');
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al leer la planilla.',
    });
  }
});

app.get('/api/vehicles/:interno', async (req, res) => {
  try {
    const query = String(req.params.interno || '').trim();
    if (!query) {
      return res.status(400).json({ ok: false, message: 'El interno es requerido.' });
    }

    const vehicles = await getVehicles();
    const found = vehicles.find((vehicle) => String(vehicle.interno || '').trim() === query);

    if (!found) {
      return res.status(404).json({ ok: false, message: `No se encontro el interno "${query}".` });
    }

    res.set('Cache-Control', 'no-store');
    return res.json({ ok: true, data: found });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error instanceof Error ? error.message : 'Error inesperado al leer la planilla.',
    });
  }
});

app.use(express.static(distDir));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  return res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
