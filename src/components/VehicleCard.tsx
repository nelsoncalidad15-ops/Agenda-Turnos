import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  BadgeCheck,
  Calendar,
  Car,
  Check,
  Clock3,
  Hash,
  Mail,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
  Sparkles,
  User,
  Wrench,
} from 'lucide-react';
import { VehicleData } from '../types/vehicle';
import { VehicleTimeline } from './VehicleTimeline';

interface VehicleCardProps {
  data: VehicleData;
}

export function VehicleCard({ data }: VehicleCardProps) {
  const print = () => window.print();

  const modelParts = data.modelo?.split(' ') ?? [];
  const modelName = modelParts.slice(0, 2).join(' ') || 'Unidad';
  const modelDetail = modelParts.slice(2).join(' ');
  const hasAccessories = Boolean(data.accesorios?.trim());

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2.5rem] border border-slate-700/80 bg-slate-950/95 shadow-[0_30px_90px_-30px_rgba(2,6,23,0.95)] backdrop-blur-2xl"
      >
        <div className="relative overflow-hidden px-6 py-6 md:px-8 md:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.85),rgba(2,6,23,0.96))]" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute left-0 bottom-0 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.34em] text-cyan-100">
                <BadgeCheck className="h-4 w-4" />
                Estado verificado
              </div>
              <button
                onClick={print}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/70 transition hover:border-white/20 hover:text-white"
              >
                <Printer className="h-4 w-4" />
                Imprimir
              </button>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_auto]">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/45">
                  <Car className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.34em]">Unidad premium</span>
                </div>
                <h2 className="text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">
                  {modelName}
                  {modelDetail ? <span className="block text-xl font-medium tracking-tight text-white/50 md:text-3xl">{modelDetail}</span> : null}
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                  Una vista oscura, elegante y operativa para consultar el estado de la unidad con foco absoluto.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 xl:w-[260px]">
                <MiniStat label="Interno" value={data.interno} icon={<Hash className="h-4 w-4" />} />
                <MiniStat label="Estado" value={data.estado || 'Pendiente'} icon={<Sparkles className="h-4 w-4" />} accent />
                <MiniStat label="Fecha" value={data.fecha || 'Pendiente'} icon={<Calendar className="h-4 w-4" />} />
                <MiniStat label="Hora" value={data.hora || '--:--'} icon={<Clock3 className="h-4 w-4" />} />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 px-6 py-6 md:px-8">
          <VehicleTimeline currentStatus={data.estado} />
        </div>

        <div className="grid gap-4 border-t border-slate-800/80 px-6 py-6 md:grid-cols-2 md:px-8">
          <InfoCard
            icon={<MapPin className="h-5 w-5 text-cyan-300" />}
            title="Ubicacion operativa"
            value={data.ubicacion || 'Centro de Entrega Regional'}
            description="Punto de coordinacion de la unidad"
          />
          <InfoCard
            icon={<Wrench className="h-5 w-5 text-emerald-300" />}
            title="Configuracion"
            value={hasAccessories ? data.accesorios! : 'Sin accesorios cargados'}
            description="Detalles tecnicos y equipamiento"
          />
        </div>

        <div className="grid gap-4 border-t border-slate-800/80 px-6 py-6 md:grid-cols-2 md:px-8">
          <InfoCard
            icon={<Calendar className="h-5 w-5 text-amber-300" />}
            title="Gestion de turno"
            value={data.fechaGestionTurno || 'Pendiente de asignacion'}
            description="Fecha vinculada al proceso"
          />
          <InfoCard
            icon={<ShieldCheck className="h-5 w-5 text-white" />}
            title="Certificacion"
            value={data.nOperacion || 'Sin numero de operacion'}
            description="Identificador del registro"
          />
        </div>
      </motion.section>

      <div className="space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-[2.5rem] border border-slate-700/80 bg-slate-950/95 p-7 text-white shadow-[0_30px_90px_-30px_rgba(2,6,23,0.95)] backdrop-blur-2xl"
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-white/40">Cliente</p>
              <h3 className="mt-2 text-3xl font-black tracking-[-0.05em]">{data.cliente}</h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/10 text-2xl font-black text-white">
              {data.cliente?.slice(0, 1) || 'A'}
            </div>
          </div>

          <div className="space-y-4">
            <ContactRow icon={<Phone className="h-4 w-4" />} label="Telefono" value={data.telefono || 'No disponible'} />
            <ContactRow icon={<Mail className="h-4 w-4" />} label="Mail" value={data.mail || 'No disponible'} />
            <ContactRow icon={<User className="h-4 w-4" />} label="Vendedor" value={data.vendedor || 'No asignado'} />
          </div>

          <div className="mt-8 grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-[10px] font-black uppercase tracking-[0.34em] text-white/50">
            <div className="flex items-center justify-between">
              <span>Tipo de venta</span>
              <span className="text-white">{data.tipoDeVenta || 'Venta directa'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tipo de cliente</span>
              <span className="text-white">{data.tipoDeCliente || 'Particular'}</span>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="rounded-[2rem] border border-slate-700/80 bg-slate-950/95 p-6 shadow-[0_30px_90px_-30px_rgba(2,6,23,0.95)] backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-white/40">Acceso rapido</p>
              <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-white">Resumen operativo</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-cyan-300/10 text-cyan-100">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <QuickLine label="Dominio" value={data.dominio || 'No informado'} />
            <QuickLine label="VIN" value={data.vin || 'No informado'} />
            <QuickLine label="Color" value={data.color || 'No informado'} />
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function MiniStat({ label, value, icon, accent }: { label: string; value: string; icon: ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-[1.35rem] border p-4 ${accent ? 'border-cyan-300/20 bg-cyan-300/10' : 'border-slate-700/80 bg-slate-900/90'}`}>
      <div className="mb-3 flex items-center gap-2 text-white/45">
        {icon}
        <span className="text-[9px] font-black uppercase tracking-[0.34em]">{label}</span>
      </div>
      <p className="text-sm font-black tracking-[-0.03em] text-white">{value}</p>
    </div>
  );
}

function InfoCard({ icon, title, value, description }: { icon: ReactNode; title: string; value: string; description: string }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-700/80 bg-slate-900/90 p-5 shadow-sm backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.34em] text-white/40">{title}</p>
        </div>
        {icon}
      </div>
      <p className="text-base font-black tracking-[-0.03em] text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
    </div>
  );
}

function ContactRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-[1.25rem] border border-slate-700/80 bg-slate-900/85 p-4">
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white/80">{icon}</div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.34em] text-white/35">{label}</p>
        <p className="mt-1 text-sm font-medium tracking-tight text-white">{value}</p>
      </div>
    </div>
  );
}

function QuickLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-[1rem] border border-slate-700/80 bg-slate-900/90 px-4 py-3">
      <span className="text-[10px] font-black uppercase tracking-[0.34em] text-white/35">{label}</span>
      <span className="max-w-[60%] truncate text-sm font-black tracking-[-0.02em] text-white">{value}</span>
    </div>
  );
}
