// lib/integrations/arca.ts
interface ARCAConfig {
    apiKey: string;
    apiUrl: string;
    taxpayerId: string;
  }
  
  interface InvoiceData {
    saleId: string;
    customerData: CustomerData;
    items: InvoiceItem[];
    total: number;
  }