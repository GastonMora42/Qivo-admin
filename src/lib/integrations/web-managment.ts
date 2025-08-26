// lib/integrations/web-management.ts
interface WebProductSync {
    productId: string;
    published: boolean;
    webPrice?: number;
    webStock?: number;
    images: string[];
  }
  
  interface WebAnalyticsData {
    visits: number;
    conversions: number;
    topProducts: string[];
    trafficSources: any[]; // Cambiado a 'any[]' para evitar el error de tipo
  }