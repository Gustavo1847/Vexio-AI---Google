export enum AppView {
  DASHBOARD = 'DASHBOARD',
  INTEGRATIONS = 'INTEGRATIONS',
  MESSAGING = 'MESSAGING',
  BILLING = 'BILLING',
  SETTINGS = 'SETTINGS'
}

export interface Integration {
  id: string;
  name: string;
  provider: 'whatsapp' | 'instagram' | 'facebook';
  connected: boolean;
  apiKey?: string;
  phoneNumber?: string;
  pageId?: string;
  icon: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'contact';
  text: string;
  timestamp: string;
  platform: 'whatsapp' | 'instagram' | 'facebook';
  type: 'text' | 'audio' | 'image';
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  platform: 'whatsapp' | 'instagram' | 'facebook';
  lastMessage: string;
  unreadCount: number;
}

export interface ChartData {
  name: string;
  messages: number;
  cost: number;
}