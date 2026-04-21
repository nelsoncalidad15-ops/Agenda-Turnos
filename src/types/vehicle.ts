export type VehicleStatus = 'Preturno' | 'Facturado' | 'Patentado' | 'Turno' | 'Pendiente' | 'En Proceso' | 'Entregado';

export interface VehicleData {
  interno: string;
  estado: VehicleStatus;
  ultimoEstado?: string;
  tipo?: string;
  fecha?: string;
  hora?: string;
  modelo?: string;
  vin?: string;
  dominio?: string;
  color?: string;
  ubicacion?: string;
  codCliente?: string;
  cliente: string;
  tipoDeVenta: string;
  tipoDeCliente: string;
  vendedor: string;
  accesorios?: string;
  precio?: string | number;
  cargoAccesorios?: string;
  telefono?: string;
  mail?: string;
  nOperacion?: string;
  entregaUsado?: string;
  seguro?: string;
  regalo?: string;
  gestionadoPor?: string;
  fechaPago?: string;
  fechaFacturacion?: string;
  fechaGestionTurno?: string;
  fechaUltModificacion?: string;
  acciones?: string;
}

export interface ApiResponse {
  ok: boolean;
  data?: VehicleData;
  message?: string;
}
