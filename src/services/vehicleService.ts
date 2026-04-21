import { ApiResponse, VehicleData } from '../types/vehicle';
import Papa from 'papaparse';

/// <reference types="vite/client" />

const PUBLIC_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbatvNVQXfFIWq5wGpd0wrTp1qW22uIiPjJLcNI-VLdl3FlHneGwyAknlu6JbBgprFJq2SlhwT2fTP/pub?gid=0&single=true&output=csv';

function camelize(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    .replace(/\s+/g, '');
}

function normalizeStatus(status: unknown): VehicleData['estado'] {
  if (typeof status !== 'string') return 'Pendiente';

  const cleaned = status.trim().toLowerCase();

  if (cleaned === 'facturado') return 'Facturado';
  if (cleaned === 'turno' || cleaned === 'en turno') return 'Turno';
  if (cleaned === 'preturno') return 'Preturno';
  if (cleaned === 'patentado') return 'Patentado';
  if (cleaned === 'entregado') return 'Entregado';
  if (cleaned === 'en proceso' || cleaned === 'proceso') return 'En Proceso';

  return 'Pendiente';
}

export const vehicleService = {
  async getAllVehicles(): Promise<VehicleData[]> {
    try {
      const response = await fetch(`${PUBLIC_SHEET_CSV_URL}&t=${Date.now()}`);
      if (!response.ok) throw new Error('No se pudo acceder a la planilla.');

      const csvText = await response.text();
      const rawLines = csvText.split('\n');

      let headerRowIndex = 0;
      for (let i = 0; i < Math.min(rawLines.length, 10); i++) {
        if (rawLines[i].toLowerCase().includes('interno')) {
          headerRowIndex = i;
          break;
        }
      }

      const cleanCsv = rawLines.slice(headerRowIndex).join('\n');

      return new Promise((resolve) => {
        Papa.parse(cleanCsv, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => camelize(header),
          complete: (results) => {
            const data = (results.data as any[])
              .map((item) => {
                const rawEstado = item.ultimoEstado || item.estado;

                return {
                  ...item,
                  ultimoEstado: rawEstado,
                  estado: normalizeStatus(rawEstado),
                } as VehicleData;
              })
              .filter((v) => v.interno && v.interno.length > 0);

            resolve(data);
          },
        });
      });
    } catch (error) {
      console.error('Fetch All Error:', error);
      return [];
    }
  },

  async getByInterno(interno: string): Promise<ApiResponse> {
    try {
      const all = await this.getAllVehicles();
      const query = interno.toString().trim();
      const found = all.find((v) => v.interno?.toString().trim() === query);

      if (found) {
        return { ok: true, data: found };
      }

      return { ok: false, message: `No se encontró el interno "${query}".` };
    } catch (error) {
      return { ok: false, message: 'Error de conexión con la planilla.' };
    }
  },
};
