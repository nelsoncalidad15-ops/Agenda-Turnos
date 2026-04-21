import React from 'react';
import {
  User,
  MapPin,
  Calendar,
  Mail,
  Truck,
  Info,
  Check,
  Shield,
  Zap,
  CreditCard,
  Hash,
  Palette,
  QrCode,
  Smartphone,
  Navigation,
  Clock,
  FileText,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { VehicleData } from '../types/vehicle';
import { motion } from 'motion/react';

interface VehicleCardProps {
  data: VehicleData;
}

const STAGES = ['Preturno', 'Facturado', 'Patentado', 'Turno'];

export function VehicleCard({ data }: VehicleCardProps) {
  const currentStageIndex = STAGES.indexOf(data.estado as string);

  const getProgressPercentage = () => {
    if (currentStageIndex === -1) return 15;
    return Math.max(15, ((currentStageIndex + 1) / STAGES.length) * 100);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-12 gap-6 print:block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-12 glass-panel p-8 md:p-12 relative overflow-hidden rounded-[4rem]"
      >
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 rotate-12 pointer-events-none">
          <CarIcon className="w-96 h-96" />
        </div>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-transparent opacity-20" />
        <div className="absolute bottom-0 left-0 w-24 h-1 bg-blue-600/40" />

        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12">
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <Badge label="Unidad certificada" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                  ID Operación: {data.nOperacion || 'AUT-9923'}
                </span>
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-[-0.04em] leading-[0.85]">
              {data.modelo?.split(' ')[0]} <span className="text-blue-600 italic">{data.modelo?.split(' ').slice(1, 3).join(' ')}</span>
              <span className="block text-slate-400 font-medium mt-3 text-2xl md:text-4xl tracking-tight">
                {data.modelo?.split(' ').slice(3).join(' ')}
              </span>
            </h2>

            <div className="flex flex-wrap gap-12 pt-4">
              <HeroStat label="Esencia" value={data.color || 'Alpine White'} icon={<Palette className="w-5 h-5" />} />
              <HeroStat label="Identidad VIN" value={data.vin || '9BWB...48160'} isMono icon={<FingerprintIcon className="w-5 h-5" />} />
              <HeroStat label="Dominio" value={data.dominio || 'AI097WA'} isMono icon={<Hash className="w-5 h-5" />} />
            </div>
          </div>

          <div className="w-full xl:w-[450px] space-y-10 bg-slate-900/5 p-8 rounded-[3rem] border border-white/40">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Estado de gestión</span>
                <p className="text-4xl font-black text-slate-900 tracking-tighter">{data.estado || 'Pendiente'}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Progreso total</span>
                <p className="text-4xl font-black text-blue-600 tracking-tighter">{Math.round(getProgressPercentage())}%</p>
              </div>
            </div>
            <div className="h-3 w-full bg-slate-200/50 rounded-full p-0.5 overflow-hidden ring-4 ring-slate-100/30">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
                className="h-full bg-slate-900 rounded-full relative"
              >
                <div className="absolute inset-0 shimmer opacity-30" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="col-span-12 xl:col-span-8 space-y-6">
        <div className="glass-panel p-10 rounded-[3.5rem]">
          <div className="flex justify-between items-center mb-14 px-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Timeline Estratégico</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2">Hoja de ruta crítica de entrega de unidad</p>
            </div>
            <QrCode className="text-slate-200 w-10 h-10" />
          </div>

          <div className="flex flex-col md:flex-row justify-between relative gap-10 md:gap-0 px-6">
            <div className="absolute top-10 left-20 right-20 h-[2px] bg-slate-100 -z-10 hidden md:block" />
            {STAGES.map((step, i) => (
              <TimelineStep
                key={step}
                label={step}
                active={currentStageIndex >= i}
                isCurrent={currentStageIndex === i}
                index={i + 1}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoPanel
            icon={<Navigation className="w-7 h-7 text-blue-600" />}
            title="Logística Operativa"
            label="Punto de recepción"
            value={data.ubicacion || 'Centro de Entrega Regional'}
            sub="Retiro coordinado bajo estrictas normas de bioseguridad"
          />
          <InfoPanel
            icon={<Calendar className="w-7 h-7 text-emerald-600" />}
            title="Cita Programada"
            label="Fecha de auditoría"
            value={`${data.fecha || 'Pendiente'} • ${data.hora || '--:--'} HS`}
            sub="Horario de precisión sujeto a trámites de patentamiento"
          />
        </div>

        {data.accesorios && (
          <div className="glass-panel p-10 rounded-[3.5rem]">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm shadow-blue-100/50">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Configuración Técnica</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Equipamiento & accesorios de fábrica</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.accesorios.split(',').map((acc, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-white/50 backdrop-blur-sm text-slate-600 rounded-3xl text-[11px] font-black uppercase tracking-wider border border-slate-100/80 hover:border-blue-400/30 hover:bg-white transition-all cursor-default group">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors shadow-sm" />
                  {acc.trim()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="col-span-12 xl:col-span-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group min-h-[450px] flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <User className="w-64 h-64" />
          </div>

          <div className="relative z-10 space-y-10">
            <header className="flex justify-between items-start">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500/80">Propietario VIP</span>
                <h3 className="text-3xl font-black tracking-tighter leading-none">{data.cliente}</h3>
              </div>
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl font-black border border-white/5 backdrop-blur-md">
                {data.cliente?.slice(0, 1)}
              </div>
            </header>

            <div className="space-y-8">
              <ContactItem icon={<Smartphone className="w-5 h-5" />} label="Línea directa" value={data.telefono || '+54 9 388 4726199'} />
              <ContactItem icon={<Mail className="w-5 h-5" />} label="Digital ID" value={data.mail || 'CORE@AUTOSOL.NET'} />
              <ContactItem icon={<User className="w-5 h-5" />} label="Consultor asignado" value={data.vendedor || 'PUNTO DE VENTA DIRECTO'} />
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 space-y-5 relative z-10">
            <div className="flex items-center justify-between text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
              <span>Modalidad</span>
              <span className="text-white bg-white/10 px-3 py-1 rounded-full">{data.tipoDeVenta || 'VENTA DIRECTA'}</span>
            </div>
            <div className="flex items-center justify-between text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
              <span>Certificación</span>
              <span className="text-white">NIVEL DIAMANTE</span>
            </div>
          </div>
        </motion.div>

        <div className="glass-panel p-10 flex items-center justify-between hover:bg-white cursor-pointer group rounded-[3rem]">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Certificado digital</span>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">TR-00492-AX</p>
          </div>
          <div className="w-14 h-14 rounded-2xl border-2 border-slate-100 flex items-center justify-center group-hover:border-blue-600 transition-all">
            <Shield className="w-7 h-7 text-slate-200 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroStat({ label, value, isMono, icon }: { label: string; value: string; isMono?: boolean; icon: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 opacity-30">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className={`text-xl font-bold text-slate-900 tracking-tight ${isMono ? 'font-mono uppercase text-sm' : ''}`}>{value}</p>
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
    <div className="flex flex-col items-center gap-6 relative group">
      <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 relative z-10 border-4 ${
        active
          ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200'
          : 'bg-white border-slate-100 text-slate-300'
      } ${isCurrent ? 'scale-110 ring-[10px] ring-blue-50' : ''}`}>
        {active && !isCurrent ? <Check className="w-8 h-8" /> : <span className="text-2xl font-black italic opacity-20">{index}</span>}
        {isCurrent && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white"
          />
        )}
      </div>
      <div className="text-center space-y-1">
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] block ${active ? 'text-slate-900' : 'text-slate-300'}`}>{label}</span>
        {isCurrent && <span className="text-[8px] font-black text-blue-600 uppercase tracking-tighter">En gestión activa</span>}
      </div>
    </div>
  );
};

function InfoPanel({ icon, title, label, value, sub }: { icon: React.ReactNode; title: string; label: string; value: string; sub: string }) {
  return (
    <div className="luxury-card p-8 flex flex-col justify-between hover:border-slate-300 transition-colors">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-lg font-black text-slate-900">{title}</h4>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</span>
        </div>
        {icon}
      </div>
      <div className="space-y-4">
        <p className="text-xl font-black text-slate-900 tracking-tight leading-tight">{value}</p>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
          <Info className="w-3.5 h-3.5 text-blue-500" />
          {sub}
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 hover:translate-x-1 transition-transform cursor-default">
      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/50 border border-white/5">
        {icon}
      </div>
      <div className="space-y-1">
        <span className="text-[9px] font-black uppercase tracking-widest text-white/30">{label}</span>
        <p className="text-sm font-bold text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function ActionTile({ icon, title, desc, onClick, variant = 'slate' }: { icon: React.ReactNode; title: string; desc: string; onClick?: () => void; variant?: 'slate' | 'emerald' }) {
  return (
    <button
      onClick={onClick}
      className={`luxury-card p-8 flex items-center gap-5 hover:shadow-xl transition-all text-left w-full group ${variant === 'emerald' ? 'bg-emerald-50/50 border-emerald-100' : ''}`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
        variant === 'emerald' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-900 group-hover:text-white'
      }`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">{title}</h4>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mt-1">{desc}</p>
      </div>
    </button>
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

function FingerprintIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M2 12c0-4.418 3.582-8 8-8s8 3.582 8 8M5 12c0-2.761 2.239-5 5-5s5 2.239 5 5M8 12c0-1.105.895-2 2-2s2 .895 2 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12c0 1.105-.895 2-2 2s-2-.895-2-2M15 12c0 2.761-2.239 5-5 5s-5-2.239-5-5M18 12c0 4.418-3.582 8-8 8s-8-3.582-8-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}