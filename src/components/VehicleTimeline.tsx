import { CheckCircle2, FileText, Clock, Package, Truck } from 'lucide-react';
import { VehicleStatus } from '../types/vehicle';
import { motion } from 'motion/react';

interface TimelineProps {
  currentStatus: VehicleStatus;
}

const STEPS = [
  { id: 'Pendiente', label: 'Pendiente', icon: Clock },
  { id: 'Turno', label: 'En Turno', icon: FileText },
  { id: 'Proceso', label: 'Preparación', icon: Package },
  { id: 'Facturado', label: 'Facturado', icon: CheckCircle2 },
  { id: 'Entregado', label: 'Entregado', icon: Truck },
];

export function VehicleTimeline({ currentStatus }: TimelineProps) {
  const getStepIndex = (status: VehicleStatus) => {
    if (status === 'Turno') return 1;
    if (status === 'Facturado') return 3;
    if (status === 'Pendiente') return 0;
    if (status === 'En Proceso') return 2;
    if (status === 'Entregado') return 4;
    return 0;
  };

  const currentIndex = getStepIndex(currentStatus);

  return (
    <div className="w-full py-8 px-4">
      <div className="relative flex justify-between">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
          className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-1000"
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
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : isCurrent
                      ? 'bg-white border-blue-600 text-blue-600 shadow-lg ring-4 ring-blue-50'
                      : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span
                className={`absolute top-12 whitespace-nowrap text-xs font-medium transition-colors duration-500 ${
                  isCurrent ? 'text-blue-600 font-bold' : isCompleted ? 'text-slate-600' : 'text-slate-400'
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