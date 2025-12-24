import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel?: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
  delay?: number;
  gradient?: boolean;
  aiInsight?: string;
}

export function KPICard({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon,
  trend,
  delay = 0,
  gradient = false,
  aiInsight,
}: KPICardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />;
      case 'down':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success bg-success/10';
      case 'down':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: delay * 0.1 }}
        className={cn(
          'relative p-6 rounded-xl border transition-all duration-300 hover:shadow-lg group',
          gradient
            ? 'bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border-primary/20'
            : 'bg-card border-border hover:border-primary/30'
        )}
      >
        {/* AI Insight Indicator */}
        {aiInsight && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="absolute top-4 right-4 p-1 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                <Sparkles className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-[200px]">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <p className="text-xs">{aiInsight}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        )}

        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">{title}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/50 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Click to see AI-powered breakdown</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            <div className="flex items-center gap-2">
              <span
                className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', getTrendColor())}
              >
                {getTrendIcon()}
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            </div>
          </div>
          <div
            className={cn(
              'p-3 rounded-xl transition-transform duration-300 group-hover:scale-110',
              gradient ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'
            )}
          >
            {icon}
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}