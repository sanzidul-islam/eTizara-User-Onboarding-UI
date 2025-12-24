export interface Tenant {
  id: string;
  name: string;
  logo?: string;
  status: 'active' | 'suspended' | 'trial';
  plan: string;
  createdAt: string;
}

export interface KPICard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  trend: 'up' | 'down' | 'stable';
}

export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface SystemHealth {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  latency: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number | string;
}

export interface MenuGroup {
  id: string;
  label: string;
  icon: string;
  items: MenuItem[];
}

export interface AIInsight {
  id: string;
  type: 'churn' | 'performance' | 'opportunity' | 'anomaly';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}