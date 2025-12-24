import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Clock, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface SystemHealth {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  latency: number;
}

interface SystemHealthCardProps {
  systems: SystemHealth[];
  delay?: number;
}

export function SystemHealthCard({ systems, delay = 0 }: SystemHealthCardProps) {
  const getStatusIcon = (status: SystemHealth['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'critical':
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusColor = (status: SystemHealth['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'critical':
        return 'bg-destructive';
    }
  };

  const overallHealth = systems.every((s) => s.status === 'healthy')
    ? 'All Systems Operational'
    : systems.some((s) => s.status === 'critical')
    ? 'Critical Issues Detected'
    : 'Some Systems Degraded';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-secondary">
            <Activity className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">System Health</h3>
            <p className="text-sm text-muted-foreground">{overallHealth}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {systems.slice(0, 5).map((system, i) => (
            <div
              key={i}
              className={cn('w-2 h-2 rounded-full', getStatusColor(system.status))}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {systems.map((system, index) => (
          <div key={system.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(system.status)}
                <span className="text-sm font-medium">{system.name}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {system.latency}ms
                </span>
                <span>{system.uptime}% uptime</span>
              </div>
            </div>
            <Progress value={system.uptime} className="h-1.5" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}