import { type ReactNode, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, ArrowLeft, BadgeCheck, Car, Fingerprint, Gauge, Search, Sparkles, WandSparkles } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { VehicleCard } from './components/VehicleCard';
import { vehicleService } from './services/vehicleService';
import { ApiResponse } from './types/vehicle';

type AppView = 'client' | 'result';

export default function App() {
  const [view, setView] = useState<AppView>('client');
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTone = useMemo(() => (isLoading ? 'Buscando unidad' : 'Precision operativa'), [isLoading]);

  const handleSearch = async (interno: string) => {
    setIsLoading(true);
    const response = await vehicleService.getByInterno(interno);
    setResult(response);
    setView(response.ok ? 'result' : 'client');
    setIsLoading(false);
  };

  const switchToClient = () => {
    setView('client');
    setResult(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_22%),linear-gradient(180deg,#020617_0%,#0f172a_45%,#111827_100%)]" />
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="absolute -top-24 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-slate-400/10 blur-3xl" />
      <div className="absolute left-0 top-1/3 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 py-6 md:px-8 md:py-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/8 text-white shadow-[0_18px_50px_-20px_rgba(2,6,23,0.9)] backdrop-blur-xl">
              <Car className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.36em] text-white/40">Autosol Jujuy</p>
              <h1 className="text-lg font-black tracking-[-0.03em] text-white">Agenda Turnos</h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-sm backdrop-blur-xl">
            <BadgeCheck className="h-4 w-4 text-cyan-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.32em] text-white/60">Google Sheets online</span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {view === 'client' && (
            <motion.section
              key="client-view"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid flex-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]"
            >
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.34em] text-white/60 shadow-sm backdrop-blur-xl">
                  <Fingerprint className="h-4 w-4 text-cyan-300" />
                  Portal ejecutivo de turnos
                </div>

                <div className="max-w-3xl space-y-5">
                  <motion.h2
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 }}
                    className="text-balance text-5xl font-black tracking-[-0.07em] text-white md:text-7xl lg:text-[5.8rem] lg:leading-[0.92]"
                  >
                    Una experiencia premium para seguir cada unidad con precision.
                  </motion.h2>

                  <motion.p
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.16 }}
                    className="max-w-2xl text-lg leading-8 text-white/68 md:text-xl"
                  >
                    Consulta rapida por interno, estado claro y una interfaz disenada para sentirse moderna, confiable y profesional.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ y: 22, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.24 }}
                  className="grid gap-4 sm:grid-cols-3"
                >
                  <MetricCard label="Busqueda" value="1 paso" icon={<Gauge className="h-4 w-4" />} />
                  <MetricCard label="Lectura" value="Clara" icon={<Sparkles className="h-4 w-4" />} />
                  <MetricCard label="Diseno" value="Premium" icon={<BadgeCheck className="h-4 w-4" />} />
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 28, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.22 }}
                className="premium-panel relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-[0_30px_90px_-30px_rgba(2,6,23,0.75)] backdrop-blur-2xl md:p-8"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),transparent_32%,rgba(15,23,42,0.35))]" />
                <div className="relative space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.34em] text-white/40">Consulta inmediata</p>
                    <h3 className="text-2xl font-black tracking-[-0.04em] text-white">Busca la unidad por interno</h3>
                    <p className="text-sm leading-6 text-white/68">
                      Un flujo simple, rapido y limpio pensado para mostrarse muy bien en pantalla grande y en movil.
                    </p>
                  </div>

                  <SearchBar onSearch={handleSearch} isLoading={isLoading} isLarge />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Pill label="Google Sheets" tone="blue" />
                    <Pill label="Listo para base de datos" tone="slate" />
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-[1rem] ${isLoading ? 'bg-cyan-400/15 text-cyan-200' : 'bg-white/10 text-white/60'}`}>
                        {isLoading ? <WandSparkles className="h-5 w-5 animate-pulse" /> : <Search className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.34em] text-white/40">{loadingTone}</p>
                        <p className="mt-1 text-sm text-white/70">
                          {isLoading ? 'Estamos consultando la planilla en tiempo real.' : 'Ingresa un interno para ver el estado detallado.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.section>
          )}

          {view === 'result' && result?.ok && result.data && (
            <motion.section
              key="result-view"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={switchToClient}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[10px] font-black uppercase tracking-[0.32em] text-white/65 shadow-sm backdrop-blur-xl transition hover:-translate-x-0.5 hover:border-white/20 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
                  Volver
                </button>

                <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200 shadow-sm">
                  <BadgeCheck className="h-4 w-4" />
                  Registro encontrado
                </div>
              </div>

              <SummaryBar data={result.data} />
              <VehicleCard data={result.data} />
            </motion.section>
          )}

          {result && !result.ok && (
            <motion.section
              key="error-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-1 items-center justify-center"
            >
              <div className="max-w-xl rounded-[2.25rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_30px_90px_-30px_rgba(2,6,23,0.85)] backdrop-blur-2xl">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-red-500/10 text-red-200">
                  <AlertCircle className="h-10 w-10" />
                </div>
                <h3 className="text-3xl font-black tracking-[-0.04em] text-white">No encontramos la unidad</h3>
                <p className="mx-auto mt-3 max-w-md text-base leading-7 text-white/60">{result.message}</p>
                <button
                  onClick={switchToClient}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-[10px] font-black uppercase tracking-[0.34em] text-slate-950 transition hover:scale-[1.02]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver a buscar
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function MetricCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-700/80 bg-slate-900/90 p-4 shadow-sm backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2 text-white/45">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">{label}</span>
      </div>
      <p className="text-xl font-black tracking-[-0.03em] text-white">{value}</p>
    </div>
  );
}

function Pill({ label, tone }: { label: string; tone: 'blue' | 'slate' }) {
  return (
    <div
      className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.32em] ${
        tone === 'blue'
          ? 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100'
          : 'border-slate-700/80 bg-slate-900/90 text-white/65'
      }`}
    >
      {label}
    </div>
  );
}

function SummaryBar({ data }: { data: { interno: string; estado: string; cliente: string; fecha?: string; hora?: string } }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <SummaryChip label="Interno" value={data.interno} />
      <SummaryChip label="Estado" value={data.estado} accent />
      <SummaryChip label="Cliente" value={data.cliente} />
      <SummaryChip label="Turno" value={`${data.fecha || 'Pendiente'} ${data.hora ? `- ${data.hora}` : ''}`} />
    </div>
  );
}

function SummaryChip({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-[1.5rem] border p-4 shadow-sm backdrop-blur-xl ${accent ? 'border-cyan-300/20 bg-cyan-300/10' : 'border-slate-700/80 bg-slate-900/90'}`}>
      <p className="text-[10px] font-black uppercase tracking-[0.34em] text-white/45">{label}</p>
      <p className="mt-2 text-lg font-black tracking-[-0.03em] text-white">{value}</p>
    </div>
  );
}
