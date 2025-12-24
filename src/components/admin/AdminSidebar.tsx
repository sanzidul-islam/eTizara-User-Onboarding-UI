import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Building2,
  Store,
  Users,
  Package,
  ShoppingCart,
  Settings,
  CreditCard,
  FileText,
  Receipt,
  Percent,
  Calculator,
  Wallet,
  Sparkles,
  Brain,
  MessageSquare,
  Wand2,
  DollarSign,
  Bot,
  Globe,
  FileCode,
  Puzzle,
  ToggleLeft,
  Activity,
  FileSearch,
  Database,
  Shield,
  Lock,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MenuGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: {
    id: string;
    label: string;
    icon: React.ReactNode;
    badge?: number | string;
  }[];
}

const menuGroups: MenuGroup[] = [
  {
    id: 'commerce',
    label: 'Tenant & Commerce',
    icon: <Building2 className="h-4 w-4" />,
    items: [
      { id: 'tenants', label: 'Tenants / Shops', icon: <Store className="h-4 w-4" />, badge: 248 },
      { id: 'vendors', label: 'Vendors', icon: <Users className="h-4 w-4" /> },
      { id: 'customers', label: 'Customers', icon: <Users className="h-4 w-4" /> },
      { id: 'orders', label: 'Orders & Logistics', icon: <Package className="h-4 w-4" />, badge: 12 },
      { id: 'marketplace', label: 'Marketplace Settings', icon: <ShoppingCart className="h-4 w-4" /> },
    ],
  },
  {
    id: 'billing',
    label: 'Billing & Finance',
    icon: <CreditCard className="h-4 w-4" />,
    items: [
      { id: 'plans', label: 'Subscription Plans', icon: <CreditCard className="h-4 w-4" /> },
      { id: 'invoices', label: 'Invoices', icon: <FileText className="h-4 w-4" /> },
      { id: 'refunds', label: 'Refunds', icon: <Receipt className="h-4 w-4" />, badge: 3 },
      { id: 'commission', label: 'Commission Engine', icon: <Percent className="h-4 w-4" /> },
      { id: 'tax', label: 'Tax & Payouts', icon: <Calculator className="h-4 w-4" /> },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Automation',
    icon: <Sparkles className="h-4 w-4" />,
    items: [
      { id: 'ai-dashboard', label: 'AI Services Dashboard', icon: <Brain className="h-4 w-4" /> },
      { id: 'ai-credits', label: 'AI Credit Wallet', icon: <Wallet className="h-4 w-4" /> },
      { id: 'prompts', label: 'Prompt Templates', icon: <MessageSquare className="h-4 w-4" /> },
      { id: 'ai-generator', label: 'AI Product Generator', icon: <Wand2 className="h-4 w-4" /> },
      { id: 'ai-pricing', label: 'AI Pricing Optimizer', icon: <DollarSign className="h-4 w-4" /> },
      { id: 'ai-assistant', label: 'AI Customer Assistant', icon: <Bot className="h-4 w-4" /> },
    ],
  },
  {
    id: 'platform',
    label: 'Platform Core',
    icon: <Globe className="h-4 w-4" />,
    items: [
      { id: 'ecommerce', label: 'eCommerce Control', icon: <ShoppingCart className="h-4 w-4" /> },
      { id: 'cms', label: 'CMS', icon: <FileCode className="h-4 w-4" /> },
      { id: 'integrations', label: 'Integrations', icon: <Puzzle className="h-4 w-4" /> },
      { id: 'features', label: 'Feature Toggles', icon: <ToggleLeft className="h-4 w-4" /> },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Security',
    icon: <Shield className="h-4 w-4" />,
    items: [
      { id: 'monitoring', label: 'Monitoring', icon: <Activity className="h-4 w-4" /> },
      { id: 'logs', label: 'Logs', icon: <FileSearch className="h-4 w-4" /> },
      { id: 'backups', label: 'Backups', icon: <Database className="h-4 w-4" /> },
      { id: 'firewall', label: 'Firewall', icon: <Shield className="h-4 w-4" /> },
      { id: 'access', label: 'Access Control', icon: <Lock className="h-4 w-4" /> },
    ],
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

export function AdminSidebar({ isCollapsed, onToggle, activeItem = 'dashboard', onItemClick }: AdminSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['commerce', 'ai']);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 72 : 280 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 z-40"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-sidebar-foreground text-lg">AdminPro</span>
              </motion.div>
            )}
          </AnimatePresence>
          {isCollapsed && (
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center mx-auto">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <div className="px-3 space-y-1">
            {/* Dashboard Link */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onItemClick?.('dashboard')}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                    activeItem === 'dashboard'
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-glow'
                      : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                  )}
                >
                  <LayoutDashboard className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span className="font-medium">Dashboard</span>}
                </button>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right">Dashboard</TooltipContent>}
            </Tooltip>

            {/* Menu Groups */}
            {menuGroups.map((group) => (
              <div key={group.id} className="pt-4">
                {!isCollapsed ? (
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider hover:text-sidebar-foreground/70 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {group.icon}
                      {group.label}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        expandedGroups.includes(group.id) ? 'rotate-180' : ''
                      )}
                    />
                  </button>
                ) : (
                  <div className="h-px bg-sidebar-border my-2" />
                )}

                <AnimatePresence>
                  {(isCollapsed || expandedGroups.includes(group.id)) && (
                    <motion.div
                      initial={!isCollapsed ? { height: 0, opacity: 0 } : false}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={!isCollapsed ? { height: 0, opacity: 0 } : undefined}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1 mt-1">
                        {group.items.map((item) => (
                          <Tooltip key={item.id}>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => onItemClick?.(item.id)}
                                className={cn(
                                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
                                  activeItem === item.id
                                    ? 'bg-sidebar-accent text-sidebar-foreground'
                                    : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                                )}
                              >
                                <span className="shrink-0">{item.icon}</span>
                                {!isCollapsed && (
                                  <>
                                    <span className="flex-1 text-left text-sm">{item.label}</span>
                                    {item.badge && (
                                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-sidebar-primary/20 text-sidebar-primary">
                                        {item.badge}
                                      </span>
                                    )}
                                  </>
                                )}
                              </button>
                            </TooltipTrigger>
                            {isCollapsed && (
                              <TooltipContent side="right" className="flex items-center gap-2">
                                {item.label}
                                {item.badge && (
                                  <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
                                    {item.badge}
                                  </span>
                                )}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Bottom Section */}
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200">
                <Settings className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span className="text-sm">Settings</span>}
              </button>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">Settings</TooltipContent>}
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200">
                <HelpCircle className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span className="text-sm">Help & Support</span>}
              </button>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">Help & Support</TooltipContent>}
          </Tooltip>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </motion.aside>
    </TooltipProvider>
  );
}