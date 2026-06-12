import Papa from 'papaparse';

const STATUS_ALIASES = {
  facturado: 'Facturado',
  preturno: 'Preturno',
  patentado: 'Patentado',
  turno: 'Turno',
  pendiente: 'Pendiente',
  enproceso: 'En Proceso',
  proceso: 'En Proceso',
  entregado: 'Entregado',
};

export function camelize(str) {
  if (!str) return '';

  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function normalizeStatus(rawStatus) {
  if (typeof rawStatus !== 'string' || !rawStatus.trim()) {
    return 'Pendiente';
  }

  const compactValue = rawStatus
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  const parts = compactValue
    .split(/[^a-z0-9]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  for (const part of parts) {
    const normalized = STATUS_ALIASES[part];
    if (normalized) return normalized;
  }

  const collapsed = parts.join('');
  return STATUS_ALIASES[collapsed] || 'Pendiente';
}

export function parseVehicleCsv(csvText) {
  const rawLines = csvText.split('\n');

  let headerRowIndex = 0;
  for (let i = 0; i < Math.min(rawLines.length, 10); i += 1) {
    if (rawLines[i].toLowerCase().includes('interno')) {
      headerRowIndex = i;
      break;
    }
  }

  const cleanCsv = rawLines.slice(headerRowIndex).join('\n');
  const results = Papa.parse(cleanCsv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => camelize(header),
  });

  return results.data
    .map((item) => ({
      ...item,
      preentAcc: item.preentAcc || '',
      estado: normalizeStatus(item.ultimoEstado || item.estado),
    }))
    .filter((vehicle) => vehicle.interno && vehicle.interno.length > 0);
}
