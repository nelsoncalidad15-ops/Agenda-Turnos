import React from 'react';
import {
  User,
  Calendar,
  Mail,
  Truck,
  Info,
  Check,
  Shield,
  QrCode,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { VehicleData } from '../types/vehicle';
import { motion } from 'motion/react';

interface VehicleCardProps {
  data: VehicleData;
}

const STAGES = ['Facturado', 'Preturno', 'Patentado', 'Turno'];

function getStatusLabel(status?: string) {
  if (status === 'Preturno') return 'Gestoria';
  return status || 'Pendiente';
}

export function VehicleCard({ data }: VehicleCardProps) {
  const currentStageIndex = STAGES.indexOf(data.estado as string);
  const accessoryValue = data.accesorios || data.cargoAccesorios || 'Sin accesorios informados';
  const accessorySub = data.accesorios && data.cargoAccesorios
    ? `Cargo adicional: ${data.cargoAccesorios}`
    : 'Equipamiento adicional registrado para la unidad';
  const agendaDateValue = data.fecha || 'Pendiente';
  const agendaHourValue = data.hora || 'A confirmar';
  const locationValue = data.ubicacion || 'Sin ubicacion';
  const advisorValue = data.vendedor || 'Punto de Venta Directo';
  const customerTypeValue = data.tipoDeCliente || 'No definido';

  const getProgressPercentage = () => {
    if (currentStageIndex === -1) return 25;
    return Math.max(25, ((currentStageIndex + 1) / STAGES.length) * 100);
  };

  const shouldShowDate = data.estado === 'Turno';
  const displayStatus = getStatusLabel(data.estado);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 print:block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-12 glass-panel p-6 md:p-10 relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem]"
      >
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 rotate-12 pointer-events-none">
          <CarIcon className="w-96 h-96" />
        </div>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-transparent opacity-20" />
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"
        />
        <div className="absolute bottom-0 left-0 w-24 h-1 bg-blue-600/40" />

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-8 md:gap-12 items-start xl:items-end">
          <div className="min-w-0 space-y-6 md:space-y-8">
            <div className="flex items-center gap-6">
              <Badge label="Unidad Certificada" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                  Interno: {data.interno}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Cliente</span>
              <p className="text-2xl md:text-3xl font-black text-white tracking-tight">{data.cliente}</p>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] leading-[0.9]">
              {data.modelo?.split(' ')[0]}{' '}
              <span className="text-blue-500 italic">{data.modelo?.split(' ').slice(1, 3).join(' ')}</span>
              <span className="block text-slate-500 font-medium mt-2 text-xl md:text-3xl tracking-tight">
                {data.modelo?.split(' ').slice(3).join(' ')}
              </span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <QuickHeroStat label="Fecha" value={agendaDateValue} />
              <QuickHeroStat label="Hora" value={agendaHourValue} />
              <QuickHeroStat label="Vendedor" value={advisorValue} />
              <QuickHeroStat label="Ubicacion" value={locationValue} />
            </div>

            {shouldShowDate && (
              <div className="flex flex-wrap gap-8 md:gap-12 pt-2">
                <HeroStat
                  label="Agenda Entrega"
                  value={`${data.fecha} - ${data.hora || '--'} HS`}
                  icon={<Calendar className="w-4 h-4 md:w-5 md:h-5" />}
                />
              </div>
            )}
          </div>

          <div className="w-full max-w-full xl:max-w-[380px] xl:justify-self-end space-y-8 md:space-y-10 bg-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/5 backdrop-blur-sm">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Ultimo Estado</span>
                <p className="text-3xl md:text-4xl font-black text-white tracking-tighter">{displayStatus}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Eficiencia</span>
                <p className="text-3xl md:text-4xl font-black text-blue-500 tracking-tighter">
                  {Math.round(getProgressPercentage())}%
                </p>
              </div>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full p-0.5 overflow-hidden ring-4 ring-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
                className="h-full bg-blue-600 rounded-full relative"
              >
                <div className="absolute inset-0 shimmer opacity-30" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="col-span-12 xl:col-span-8 space-y-4 md:space-y-6">
        <div className="glass-panel p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem]">
          <div className="flex justify-between items-center mb-10 md:mb-14 px-4">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">Timeline Estrategico</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2">
                Hoja de ruta critica de la unidad hasta la entrega
              </p>
            </div>
            <QrCode className="text-white/10 w-8 h-8 md:w-10 md:h-10" />
          </div>

          <div className="flex flex-col md:flex-row justify-between relative gap-10 md:gap-0 px-6">
            <div className="absolute top-10 left-20 right-20 h-[2px] bg-white/5 -z-10 hidden md:block" />
            {STAGES.map((step, i) => (
              <TimelineStep
                key={step}
                label={getStatusLabel(step)}
                active={currentStageIndex >= i}
                isCurrent={currentStageIndex === i}
                index={i + 1}
              />
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem]">
          <div className="flex justify-between items-start gap-6 mb-8 md:mb-10">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Proxima Gestion</span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Resumen de Coordinacion</h3>
              <p className="text-sm md:text-base text-slate-400 font-medium">
                Todo lo clave para confirmar turno, contacto y estado sin ir a los datos tecnicos.
              </p>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-white/10 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 md:w-7 md:h-7 text-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MiniStat label="Telefono" value={data.telefono || 'No disponible'} />
            <MiniStat label="Email" value={data.mail || 'No disponible'} />
            <MiniStat label="Tipo de Cliente" value={customerTypeValue} />
            <MiniStat label="Tipo de Venta" value={data.tipoDeVenta || 'No definida'} />
            <MiniStat label="Dominio" value={data.dominio || 'Sin dominio'} />
            <MiniStat label="Interno" value={data.interno} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <InfoPanel
            icon={<User className="w-6 h-6 md:w-7 md:h-7 text-blue-500" />}
            title="Consultoria Comercial"
            label="Asesor Responsable"
            value={advisorValue}
            sub="Punto principal de contacto para avances y coordinacion"
          />
          <InfoPanel
            icon={<Truck className="w-6 h-6 md:w-7 md:h-7 text-emerald-500" />}
            title="Llave x llave"
            label="Entrega de Usado"
            value={data.entregaUsado || 'No declarada'}
            sub="Dato operativo a confirmar antes del cierre de entrega"
          />
        </div>

        <InfoPanel
          icon={<Sparkles className="w-6 h-6 md:w-7 md:h-7 text-amber-400" />}
          title="Accesorios"
          label="Equipamiento"
          value={accessoryValue}
          sub={accessorySub}
        />
      </div>

      <div className="col-span-12 xl:col-span-4 space-y-4 md:space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group border border-white/5"
        >
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <User className="w-64 h-64" />
          </div>

          <div className="relative z-10 space-y-8">
            <header className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Datos del Cliente</span>
                <h3 className="text-xl md:text-2xl font-black tracking-tighter leading-tight text-white">{data.cliente}</h3>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg md:text-xl font-black shadow-lg shadow-blue-600/20">
                {data.cliente?.slice(0, 1)}
              </div>
            </header>

            <div className="space-y-6">
              <ContactItem
                icon={<Smartphone className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />}
                label="Linea Directa"
                value={data.telefono || 'No disponible'}
              />
              <ContactItem
                icon={<Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />}
                label="Email Principal"
                value={data.mail || 'No disponible'}
              />
            </div>
          </div>
        </motion.div>

        <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/5">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Administracion</span>
              <p className="text-2xl md:text-3xl font-black text-white tracking-tight">Fechas Clave</p>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-white/10 flex items-center justify-center">
              <Shield className="w-6 h-6 md:w-7 md:h-7 text-blue-500" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4">
            <MiniStat label="Fecha de Facturacion" value={data.fechaFacturacion || 'No informada'} />
            <MiniStat label="Fecha de Pago" value={data.fechaPago || 'No informada'} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroStat({ label, value, isMono, icon }: { label: string; value: string; isMono?: boolean; icon: React.ReactNode }) {
  return (
    <div className="space-y-2 md:space-y-4">
      <div className="flex items-center gap-2 opacity-40">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className={`text-lg md:text-xl font-bold text-white tracking-tight ${isMono ? 'font-mono uppercase text-sm' : ''}`}>{value}</p>
    </div>
  );
}

function QuickHeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-3">
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">{label}</span>
      <p className="mt-2 text-sm md:text-base font-black text-white leading-tight">{value}</p>
    </div>
  );
}

interface TimelineStepProps {
  label: string;
  active: boolean;
  isCurrent: boolean;
  index: number;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ label, active, isCurrent, index }) => {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 relative group">
      <div
        className={`w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-center transition-all duration-700 relative z-10 border-2 md:border-4 ${
          active ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-white/5 border-white/10 text-slate-600'
        } ${isCurrent ? 'scale-110 ring-[6px] md:ring-[10px] ring-blue-500/10' : ''}`}
      >
        {active && !isCurrent ? <Check className="w-6 h-6 md:w-8 md:h-8" /> : <span className="text-xl md:text-2xl font-black italic opacity-20">{index}</span>}
        {isCurrent && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-blue-100 rounded-full border-[3px] md:border-4 border-blue-600 shadow-sm"
          />
        )}
      </div>
      <div className="text-center space-y-1">
        <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] block ${active ? 'text-white' : 'text-slate-600'}`}>{label}</span>
        {isCurrent && <span className="text-[8px] font-black text-blue-500 uppercase tracking-tighter">Gestion Activa</span>}
      </div>
    </div>
  );
};

function InfoPanel({ icon, title, label, value, sub }: { icon: React.ReactNode; title: string; label: string; value: string; sub: string }) {
  return (
    <div className="luxury-card p-6 md:p-8 flex flex-col justify-between hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-base md:text-lg font-black text-white">{title}</h4>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</span>
        </div>
        {icon}
      </div>
      <div className="space-y-4">
        <p className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">{value}</p>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
          <Info className="w-3.5 h-3.5 text-blue-500" />
          {sub}
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 hover:translate-x-1 transition-transform cursor-default group/item">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/5 text-blue-500 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
        {icon}
      </div>
      <div className="space-y-1">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</span>
        <p className="text-xs md:text-sm font-bold tracking-tight text-white">{value}</p>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.6rem] border border-white/6 bg-white/5 p-4 md:p-5">
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">{label}</span>
      <p className="mt-2 text-sm md:text-base font-bold text-white leading-tight">{value}</p>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-blue-200">
      {label}
    </span>
  );
}

function CarIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  );
}
