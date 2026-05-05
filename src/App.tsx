import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { VehicleCard } from './components/VehicleCard';
import { vehicleService } from './services/vehicleService';
import { ApiResponse } from './types/vehicle';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  AlertCircle, 
  ChevronLeft,
  Fingerprint
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
    <div className="min-h-screen relative flex flex-col font-sans selection:bg-blue-600/20 selection:text-white overflow-hidden">
      {/* Structural Layer: Technical Grid */}
      <div className="absolute inset-0 z-[-5] tech-grid opacity-30" />
      <div className="absolute inset-0 z-[-4] bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.05)_0%,transparent_50%)]" />

      {/* Main Experience Area */}
      <main className="flex-1 p-4 md:px-10 md:pb-10 md:pt-4 w-full max-w-[1600px] mx-auto z-10 flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* VIEW: CLIENT LANDING (High Impact) */}
          {view === 'client' && (
            <motion.div
              key="client-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col items-center justify-center relative py-6 md:py-10"
            >
              <div className="w-full max-w-4xl text-center space-y-8 md:space-y-10">
                <div className="space-y-4 md:space-y-6">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center shadow-[0_40px_80px_-15px_rgba(59,130,246,0.2)] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <Car className="w-6 h-6 md:w-10 md:h-10 text-slate-900 relative z-10" />
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-sm text-slate-400"
                  >
                    <Fingerprint className="w-4 h-4 text-blue-500" /> Portal Exclusivo Autosol
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black text-white tracking-[-0.05em] leading-[0.9] text-balance"
                  >
                    Tu próximo <span className="text-blue-600 italic">Core.</span>
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-400 text-base md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed tracking-tight"
                  >
                    Sincronización táctica de tu unidad. Monitoreo absoluto desde la facturación hasta la entrega final.
                  </motion.p>
                </div>

                <motion.div 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="glass-panel p-4 md:p-8 rounded-[2.5rem] md:rounded-[3.5rem] max-w-2xl mx-auto relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[2.8rem] md:rounded-[3.8rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <SearchBar onSearch={handleSearch} isLoading={isLoading} isLarge />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* VIEW: RESULT DETAIL */}
          {view === 'result' && result?.ok && result.data && (
            <motion.div
              key="result-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="w-full space-y-4 md:space-y-6"
            >
              <div className="flex items-center pt-2">
                <button 
                  onClick={switchToClient}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all group"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" /> 
                </button>
              </div>
              <VehicleCard data={result.data} />
            </motion.div>
          )}

          {/* GLOBAL ERROR STATE */}
          {result && !result.ok && (
            <motion.div
              key="error-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-red-500/10 text-red-500 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center mb-8 border border-red-500/20 shadow-2xl shadow-red-500/5">
                <AlertCircle className="w-12 h-12 md:w-16 md:h-16" />
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">Unidad no Registrada</h3>
              <p className="text-slate-400 text-base md:text-xl font-medium max-w-lg mx-auto mb-10">
                {result.message}
              </p>
              <button
                onClick={switchToClient}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-600/20 active:scale-95"
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
