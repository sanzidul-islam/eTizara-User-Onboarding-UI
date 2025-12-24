import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  ChevronDown,
  Sun,
  Moon,
  Building2,
  LogOut,
  User,
  Settings,
  HelpCircle,
  Check,
  AlertTriangle,
  Info,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Tenant {
  id: string;
  name: string;
  logo?: string;
}

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const tenants: Tenant[] = [
  { id: '1', name: 'All Tenants' },
  { id: '2', name: 'TechStore Pro' },
  { id: '3', name: 'Fashion Hub' },
  { id: '4', name: 'Electronics Mart' },
  { id: '5', name: 'Home Essentials' },
];

const notifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Fraud Detection Alert',
    message: 'Unusual payment pattern detected for tenant TechStore Pro',
    timestamp: '2 min ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'High API Usage',
    message: 'Fashion Hub approaching API rate limit (85%)',
    timestamp: '15 min ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'Backup Complete',
    message: 'Daily backup completed successfully',
    timestamp: '1 hour ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'New Tenant Signup',
    message: 'Electronics Mart has completed onboarding',
    timestamp: '3 hours ago',
    isRead: true,
  },
];

interface AdminTopBarProps {
  sidebarWidth: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function AdminTopBar({ sidebarWidth, isDarkMode, onToggleDarkMode }: AdminTopBarProps) {
  const [selectedTenant, setSelectedTenant] = useState<Tenant>(tenants[0]);
  const [showSearch, setShowSearch] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'success':
        return <Check className="h-4 w-4 text-success" />;
      case 'info':
        return <Info className="h-4 w-4 text-info" />;
    }
  };

  return (
    <header
      style={{ marginLeft: sidebarWidth }}
      className="h-16 bg-card/80 backdrop-blur-sm border-b border-border fixed top-0 right-0 left-0 z-30 transition-all duration-200"
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section - Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tenants, orders, customers..."
              className="pl-10 bg-secondary/50 border-0 focus-visible:ring-1"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Tenant Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 px-3">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="hidden sm:inline max-w-[120px] truncate">{selectedTenant.name}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Switch Tenant</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {tenants.map((tenant) => (
                <DropdownMenuItem
                  key={tenant.id}
                  onClick={() => setSelectedTenant(tenant)}
                  className={cn(selectedTenant.id === tenant.id && 'bg-accent')}
                >
                  <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                  {tenant.name}
                  {selectedTenant.id === tenant.id && <Check className="h-4 w-4 ml-auto" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark Mode Toggle */}
          <Button variant="ghost" size="icon" onClick={onToggleDarkMode} className="relative">
            <AnimatePresence mode="wait">
              {isDarkMode ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-[300px]">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'p-3 border-b border-border last:border-0 cursor-pointer hover:bg-accent/50 transition-colors',
                      !notification.isRead && 'bg-accent/30'
                    )}
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="ghost" className="w-full text-sm">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">Sarah Admin</span>
                  <span className="text-xs text-muted-foreground">Super Admin</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}