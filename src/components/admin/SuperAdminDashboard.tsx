import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Store, DollarSign, Cpu, Bot } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { KPICard } from './KPICard';
import { SystemHealthCard } from './SystemHealthCard';
import { AlertsCard } from './AlertsCard';
import { RevenueChart } from './RevenueChart';
import { OrdersChart } from './OrdersChart';
import { AIInsightCard } from './AIInsightCard';
import { AICopilotPanel } from './AICopilotPanel';
import { Button } from '@/components/ui/button';

const systemHealth = [
  { name: 'API Gateway', status: 'healthy' as const, uptime: 99.99, latency: 45 },
  { name: 'Database Cluster', status: 'healthy' as const, uptime: 99.95, latency: 12 },
  { name: 'Payment Service', status: 'warning' as const, uptime: 99.8, latency: 120 },
  { name: 'CDN', status: 'healthy' as const, uptime: 99.99, latency: 8 },
  { name: 'Queue Workers', status: 'healthy' as const, uptime: 99.9, latency: 35 },
];

const alerts = [
  {
    id: '1',
    type: 'fraud' as const,
    severity: 'high' as const,
    title: 'Suspicious Transaction Pattern',
    description: 'Multiple high-value orders from new account in TechStore Pro',
    timestamp: '2 minutes ago',
  },
  {
    id: '2',
    type: 'payment' as const,
    severity: 'medium' as const,
    title: 'Payment Gateway Timeout',
    description: 'Stripe webhook experiencing delays (avg 2.3s)',
    timestamp: '15 minutes ago',
  },
  {
    id: '3',
    type: 'resource' as const,
    severity: 'low' as const,
    title: 'Storage Threshold Warning',
    description: 'Fashion Hub approaching 80% storage quota',
    timestamp: '1 hour ago',
  },
];

const aiInsights = [
  {
    id: '1',
    type: 'churn' as const,
    title: 'Tenants at Risk of Churn',
    description: '3 tenants showing declining engagement patterns over the past 2 weeks',
    confidence: 87,
    priority: 'high' as const,
    actionable: true,
  },
  {
    id: '2',
    type: 'performance' as const,
    title: 'High-Performing Products',
    description: 'Electronics category showing 45% higher conversion than average',
    confidence: 92,
    priority: 'medium' as const,
    actionable: true,
  },
  {
    id: '3',
    type: 'opportunity' as const,
    title: 'Upsell Opportunity',
    description: '12 tenants on Basic plan with usage patterns suggesting Pro plan fit',
    confidence: 78,
    priority: 'medium' as const,
    actionable: true,
  },
];

export function SuperAdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);

  const sidebarWidth = sidebarCollapsed ? 72 : 280;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeItem}
        onItemClick={setActiveItem}
      />
      <AdminTopBar
        sidebarWidth={sidebarWidth}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <main
        style={{ marginLeft: sidebarWidth }}
        className="pt-16 min-h-screen transition-all duration-200"
      >
        <div className="p-6 max-w-[1600px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold mb-1">Welcome back, Sarah</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your platform today.
            </p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KPICard
              title="Total Tenants"
              value="248"
              change={12}
              icon={<Building2 className="h-6 w-6" />}
              trend="up"
              delay={0}
              aiInsight="Growth rate increased 23% compared to previous quarter"
            />
            <KPICard
              title="Active Shops"
              value="1,847"
              change={8}
              icon={<Store className="h-6 w-6" />}
              trend="up"
              delay={1}
            />
            <KPICard
              title="Platform Revenue"
              value="$842.5K"
              change={15}
              icon={<DollarSign className="h-6 w-6" />}
              trend="up"
              delay={2}
              gradient
              aiInsight="Revenue projection indicates $1M+ possible by Q4"
            />
            <KPICard
              title="AI Credit Usage"
              value="2.4M"
              change={-3}
              icon={<Cpu className="h-6 w-6" />}
              trend="down"
              delay={3}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RevenueChart delay={0.2} />
            <OrdersChart delay={0.3} />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SystemHealthCard systems={systemHealth} delay={0.4} />
            <AlertsCard alerts={alerts} delay={0.5} />
            <AIInsightCard insights={aiInsights} delay={0.6} />
          </div>
        </div>
      </main>

      {/* AI Copilot FAB */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed right-6 bottom-6 z-40"
      >
        {!showCopilot && (
          <Button
            onClick={() => setShowCopilot(true)}
            className="h-14 w-14 rounded-full shadow-lg gradient-primary hover:shadow-glow transition-shadow"
          >
            <Bot className="h-6 w-6" />
          </Button>
        )}
      </motion.div>

      {/* AI Copilot Panel */}
      <AICopilotPanel isOpen={showCopilot} onClose={() => setShowCopilot(false)} />
    </div>
  );
}