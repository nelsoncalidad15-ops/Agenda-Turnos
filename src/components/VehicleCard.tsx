import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  BadgeCheck,
  Calendar,
  Car,
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

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/80 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.25)] backdrop-blur-2xl"
      >
        <div className="relative overflow-hidden px-6 py-6 md:px-8 md:py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.92),rgba(248,250,252,0.9))]" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.34em] text-blue-700">
                <BadgeCheck className="h-4 w-4" />
                Estado verificado
              </div>
              <button
                onClick={print}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                <Printer className="h-4 w-4" />
                Imprimir
              </button>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_auto]">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <Car className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.34em]">Unidad premium</span>
                </div>
                <h2 className="text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-6xl">
                  {modelName}
                  {modelDetail ? <span className="block text-xl font-medium tracking-tight text-slate-400 md:text-3xl">{modelDetail}</span> : null}
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                  Una vista clara, elegante y operativa para consultar el estado de la unidad sin distracciones.
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

        <div className="border-t border-slate-100 px-6 py-6 md:px-8">
          <VehicleTimeline currentStatus={data.estado} />
        </div>

        <div className="grid gap-4 border-t border-slate-100 px-6 py-6 md:grid-cols-2 md:px-8">
          <InfoCard
            icon={<MapPin className="h-5 w-5 text-blue-600" />}
            title="Ubicacion operativa"
            value={data.ubicacion || 'Centro de Entrega Regional'}
            description="Punto de coordinacion de la unidad"
          />
          <InfoCard
            icon={<Wrench className="h-5 w-5 text-emerald-600" />}
            title="Configuracion"
            value={data.accesorios || 'Sin accesorios cargados'}
            description="Detalles tecnicos y equipamiento"
          />
        </div>

        <div className="grid gap-4 border-t border-slate-100 px-6 py-6 md:grid-cols-2 md:px-8">
          <InfoCard
            icon={<Calendar className="h-5 w-5 text-amber-600" />}
            title="Gestion de turno"
            value={data.fechaGestionTurno || 'Pendiente de asignacion'}
            description="Fecha vinculada al proceso"
          />
          <InfoCard
            icon={<ShieldCheck className="h-5 w-5 text-slate-900" />}
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
          className="rounded-[2.5rem] border border-slate-900/5 bg-slate-950 p-7 text-white shadow-[0_30px_90px_-30px_rgba(15,23,42,0.65)]"
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-white/40">Cliente</p>
              <h3 className="mt-2 text-3xl font-black tracking-[-0.05em]">{data.cliente}</h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white/10 text-2xl font-black">
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
          className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.2)] backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-slate-400">Acceso rapido</p>
              <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-slate-950">Resumen operativo</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-blue-50 text-blue-600">
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
    <div className={`rounded-[1.35rem] border p-4 ${accent ? 'border-blue-100 bg-blue-50' : 'border-slate-100 bg-white'}`}>
      <div className="mb-3 flex items-center gap-2 text-slate-400">
        {icon}
        <span className="text-[9px] font-black uppercase tracking-[0.34em]">{label}</span>
      </div>
      <p className="text-sm font-black tracking-[-0.03em] text-slate-950">{value}</p>
    </div>
  );
}

function InfoCard({ icon, title, value, description }: { icon: ReactNode; title: string; value: string; description: string }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-100 bg-white/90 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.34em] text-slate-400">{title}</p>
        </div>
        {icon}
      </div>
      <p className="text-base font-black tracking-[-0.03em] text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function ContactRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80">{icon}</div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.34em] text-white/35">{label}</p>
        <p className="mt-1 text-sm font-medium tracking-tight text-white">{value}</p>
      </div>
    </div>
  );
}

function QuickLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-[1rem] border border-slate-100 bg-slate-50/70 px-4 py-3">
      <span className="text-[10px] font-black uppercase tracking-[0.34em] text-slate-400">{label}</span>
      <span className="max-w-[60%] truncate text-sm font-black tracking-[-0.02em] text-slate-950">{value}</span>
    </div>
  );
}
