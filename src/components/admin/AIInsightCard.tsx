import { motion } from 'framer-motion';
import { Sparkles, TrendingDown, TrendingUp, AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AIInsight {
  id: string;
  type: 'churn' | 'performance' | 'opportunity' | 'anomaly';
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
}

interface AIInsightCardProps {
  insights: AIInsight[];
  delay?: number;
}

export function AIInsightCard({ insights, delay = 0 }: AIInsightCardProps) {
  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'churn':
        return <TrendingDown className="h-4 w-4" />;
      case 'performance':
        return <TrendingUp className="h-4 w-4" />;
      case 'opportunity':
        return <Lightbulb className="h-4 w-4" />;
      case 'anomaly':
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'churn':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'performance':
        return 'bg-success/10 text-success border-success/20';
      case 'opportunity':
        return 'bg-info/10 text-info border-info/20';
      case 'anomaly':
        return 'bg-warning/10 text-warning border-warning/20';
    }
  };

  const getPriorityBadge = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-[10px]">High Priority</Badge>;
      case 'medium':
        return <Badge className="text-[10px] bg-warning text-warning-foreground">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary" className="text-[10px]">Low</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-gradient-to-br from-accent/5 via-primary/5 to-transparent border border-accent/20 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-accent">
            <Sparkles className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              AI Insights
              <Badge variant="secondary" className="text-[10px] font-normal">Beta</Badge>
            </h3>
            <p className="text-sm text-muted-foreground">Powered by machine learning</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
          <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + index * 0.1 }}
            className={cn(
              'p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md',
              getInsightColor(insight.type)
            )}
          >
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-current/10">{getInsightIcon(insight.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{insight.title}</span>
                  {getPriorityBadge(insight.priority)}
                </div>
                <p className="text-xs opacity-80">{insight.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] opacity-60">
                    Confidence: {insight.confidence}%
                  </span>
                  {insight.actionable && (
                    <Button variant="link" size="sm" className="h-auto p-0 text-[10px]">
                      Take Action →
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}