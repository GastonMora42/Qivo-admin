// lib/integrations/dollar-quote.ts
interface DollarQuote {
    buy: number;
    sell: number;
    timestamp: Date;
    source: 'blue' | 'oficial' | 'mep';
  }