import { ApiResponse, VehicleData } from '../types/vehicle';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export const vehicleService = {
  async getAllVehicles(): Promise<VehicleData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles`);
      if (!response.ok) throw new Error('No se pudo acceder a la planilla.');

      return await response.json();
    } catch (error) {
      console.error('Fetch All Error:', error);
      return [];
    }
  },

  async getByInterno(interno: string): Promise<ApiResponse> {
    try {
      const query = interno.toString().trim();
      const response = await fetch(`${API_BASE_URL}/vehicles/${encodeURIComponent(query)}`);
      const payload = await response.json();

      if (!response.ok) {
        return {
          ok: false,
          message: payload?.message || 'No se pudo consultar la unidad.',
        };
      }

      return payload;
    } catch (error) {
      return { ok: false, message: 'Error de conexion con la planilla.' };
    }
  }
};
