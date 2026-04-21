import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { VehicleCard } from './components/VehicleCard';
import { vehicleService } from './services/vehicleService';
import { ApiResponse } from './types/vehicle';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car,
  AlertCircle,
  ChevronLeft,
  Fingerprint,
} from 'lucide-react';

type AppView = 'client' | 'result';

export default function App() {
  const [view, setView] = useState<AppView>('client');
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (interno: string) => {
    setIsLoading(true);
    const response = await vehicleService.getByInterno(interno);
    setResult(response);
    if (response.ok) {
      setView('result');
    }
    setIsLoading(false);
  };

  const switchToClient = () => {
    setView('client');
    setResult(null);
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans selection:bg-blue-600/10 selection:text-blue-900 overflow-hidden">
      <div className="absolute inset-0 z-[-5] tech-grid opacity-20" />
      <div className="absolute inset-0 z-[-4] bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.03)_0%,transparent_50%)]" />

      <main className="flex-1 p-6 md:p-10 w-full max-w-[1600px] mx-auto z-10">
        <AnimatePresence mode="wait">
          {view === 'client' && (
            <motion.div
              key="client-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[85vh] flex flex-col items-center justify-center relative"
            >
              <div className="w-full max-w-5xl text-center space-y-16">
                <div className="space-y-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center shadow-[0_40px_80px_-15px_rgba(15,23,42,0.3)] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <Car className="w-10 h-10 text-white relative z-10" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-4 bg-white/40 backdrop-blur-md border border-white/60 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-sm text-slate-500"
                  >
                    <Fingerprint className="w-4 h-4 text-blue-500" /> Agenda Turnos Autosol
                  </motion.div>

                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl md:text-[9.5rem] font-black text-slate-900 tracking-[-0.05em] leading-[0.8] text-balance"
                  >
                    Tu próximo <span className="text-blue-600 italic">turno.</span>
                  </motion.h2>

                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-400 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed tracking-tight"
                  >
                    Sincronización táctica de tu unidad. Monitoreo absoluto desde el preturno hasta la entrega final.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/60 backdrop-blur-xl p-5 md:p-8 rounded-[3.5rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.08)] border border-white/80 max-w-2xl mx-auto relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-[3.8rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <SearchBar onSearch={handleSearch} isLoading={isLoading} isLarge />
                </motion.div>
              </div>
            </motion.div>
          )}

          {view === 'result' && result?.ok && result.data && (
            <motion.div
              key="result-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="w-full space-y-8"
            >
              <div className="flex items-center">
                <button
                  onClick={switchToClient}
                  className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all group"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
              <VehicleCard data={result.data} />
            </motion.div>
          )}

          {result && !result.ok && (
            <motion.div
              key="error-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-32 h-32 bg-red-50 text-red-500 rounded-[3rem] flex items-center justify-center mb-10 border border-red-100 shadow-2xl shadow-red-100/50">
                <AlertCircle className="w-16 h-16" />
              </div>
              <h3 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Unidad no registrada</h3>
              <p className="text-slate-400 text-xl font-medium max-w-lg mx-auto mb-12">
                {result.message}
              </p>
              <button
                onClick={switchToClient}
                className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-slate-800 transition-all hover:scale-105 shadow-2xl shadow-slate-200 active:scale-95"
              >
                Volver a buscar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}