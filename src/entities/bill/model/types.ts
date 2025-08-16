export interface BillDish {
  id: string;
  title: string;
  priceCents: number;
  qty: number;
}

export interface PromoRule {
  code: string;
  type: 'percent' | 'flat';
  value: number;           
  maxOffCents?: number;    
}

export interface BillState {
  baseFareCents: number;       
  dishes: BillDish[];          
  extraBaggageCount: number;   
  extraBaggageUnitCents: number;
  promoCode: string | null;
  promoRule: PromoRule | null; 
}

