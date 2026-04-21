import { CheckCircle2, FileText, Clock, Package, Truck } from 'lucide-react';
import { VehicleStatus } from '../types/vehicle';
import { motion } from 'motion/react';

interface TimelineProps {
  currentStatus: VehicleStatus | string;
}

const STEPS = [
  { id: 'Pendiente', label: 'Pendiente', icon: Clock },
  { id: 'Turno', label: 'En Turno', icon: FileText },
  { id: 'Proceso', label: 'Preparacion', icon: Package },
  { id: 'Facturado', label: 'Facturado', icon: CheckCircle2 },
  { id: 'Entregado', label: 'Entregado', icon: Truck },
];

export function VehicleTimeline({ currentStatus }: TimelineProps) {
  const getStepIndex = (status: VehicleStatus | string) => {
    const normalized = status.trim().toLowerCase();

    if (normalized === 'turno' || normalized === 'en turno') return 1;
    if (normalized === 'facturado') return 3;
    if (normalized === 'pendiente') return 0;
    if (normalized === 'en proceso' || normalized === 'proceso') return 2;
    if (normalized === 'entregado') return 4;
    return 0;
  };

  const currentIndex = getStepIndex(currentStatus);

  return (
    <div className="w-full py-8 px-4">
      <div className="relative flex justify-between">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
          className="absolute top-1/2 left-0 h-0.5 bg-cyan-300 -translate-y-1/2 z-0 transition-all duration-1000"
        />

        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                  isCompleted
                    ? 'bg-cyan-300 border-cyan-300 text-slate-950'
                    : isCurrent
                      ? 'bg-white border-cyan-300 text-cyan-300 shadow-lg ring-4 ring-cyan-300/10'
                      : 'bg-white/5 border-white/10 text-white/30'
                }`}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span
                className={`absolute top-12 whitespace-nowrap text-xs font-medium transition-colors duration-500 ${
                  isCurrent ? 'text-cyan-200 font-bold' : isCompleted ? 'text-white/70' : 'text-white/35'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
