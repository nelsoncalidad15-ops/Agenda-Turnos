import { CalendarDays, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { VehicleStatus } from '../types/vehicle';
import { motion } from 'motion/react';

interface TimelineProps {
  currentStatus: VehicleStatus | string;
}

const STEPS = [
  { id: 'Preturno', label: 'Pre Turno', icon: Clock },
  { id: 'Facturado', label: 'Facturado', icon: CheckCircle2 },
  { id: 'Patentado', label: 'Patentado', icon: ShieldCheck },
  { id: 'Turno', label: 'Turno', icon: CalendarDays },
];

export function VehicleTimeline({ currentStatus }: TimelineProps) {
  const getStepIndex = (status: VehicleStatus | string) => {
    const normalized = status.trim().toLowerCase();

    if (normalized === 'preturno' || normalized === 'pre turno') return 0;
    if (normalized === 'facturado') return 1;
    if (normalized === 'patentado') return 2;
    if (normalized === 'turno' || normalized === 'en turno') return 3;
    return 0;
  };

  const currentIndex = getStepIndex(currentStatus);

  return (
    <div className="w-full py-8 px-4">
      <div className="relative flex justify-between">
        <div className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 z-0 bg-white/10" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
          className="absolute top-1/2 left-0 z-0 h-0.5 -translate-y-1/2 bg-cyan-300 transition-all duration-1000"
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
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                  isCompleted
                    ? 'border-cyan-300 bg-cyan-300 text-slate-950'
                    : isCurrent
                      ? 'border-cyan-300 bg-white text-cyan-300 shadow-lg ring-4 ring-cyan-300/10'
                      : 'border-white/10 bg-white/5 text-white/30'
                }`}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <span
                className={`absolute top-12 whitespace-nowrap text-xs font-medium transition-colors duration-500 ${
                  isCurrent ? 'font-bold text-cyan-200' : isCompleted ? 'text-white/70' : 'text-white/35'
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
