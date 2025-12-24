import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, CreditCard, Server, ChevronRight, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Alert {
  id: string;
  type: 'fraud' | 'payment' | 'resource' | 'security';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: string;
}

interface AlertsCardProps {
  alerts: Alert[];
  delay?: number;
}

export function AlertsCard({ alerts, delay = 0 }: AlertsCardProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'fraud':
        return <ShieldAlert className="h-4 w-4" />;
      case 'payment':
        return <CreditCard className="h-4 w-4" />;
      case 'resource':
        return <Server className="h-4 w-4" />;
      case 'security':
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-info/10 text-info border-info/20';
    }
  };

  const getSeverityBadge = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive" className="text-[10px] px-1.5">High</Badge>;
      case 'medium':
        return <Badge className="text-[10px] px-1.5 bg-warning text-warning-foreground">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary" className="text-[10px] px-1.5">Low</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <Bell className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold">Active Alerts</h3>
            <p className="text-sm text-muted-foreground">{alerts.length} alerts require attention</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
          <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + index * 0.1 }}
            className={cn(
              'p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md',
              getSeverityColor(alert.severity)
            )}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium truncate">{alert.title}</span>
                  {getSeverityBadge(alert.severity)}
                </div>
                <p className="text-xs opacity-80 line-clamp-1">{alert.description}</p>
                <p className="text-[10px] opacity-60 mt-1">{alert.timestamp}</p>
              </div>
              <ChevronRight className="h-4 w-4 opacity-50 shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}