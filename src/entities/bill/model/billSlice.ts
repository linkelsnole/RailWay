import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BillState, PromoRule } from './types';

function parsePriceToCents(text: string): number {
  const clean = text.replace(/[^\d.]/g, '');
  const num = Number(clean || 0);
  return Math.round(num * 100);
}

const initialState: BillState = {
	baseFareCents: 0,
  dishes: [],
  extraBaggageCount: 0,
  extraBaggageUnitCents: 10000, 
  promoCode: null,
  promoRule: null,
}

function normalizeQty(n: number): number {
  return Math.max(0, Math.floor(n || 0));
}

function promoFromCode(code: string): PromoRule | null {
  const c = code.trim().toUpperCase();
  if (c === 'BOOKNOW') return { code: c, type: 'percent', value: 50, maxOffCents: 10000 }; 
  if (c === 'FIRSTTIME') return { code: c, type: 'percent', value: 20 };
  return null;
}

const slice = createSlice({
	name: 'bill',
	initialState,
	reducers: {
		setBaseFareCents(state, action: PayloadAction<number>) {
      state.baseFareCents = Math.max(0, Math.floor(action.payload || 0));
    },
		addDishByText(
      state,
      action: PayloadAction<{ id: string; title: string; priceText: string }>
    ) {
      const priceCents = parsePriceToCents(action.payload.priceText);
      const found = state.dishes.find((d) => d.id === action.payload.id);
      if (found) found.qty += 1;
      else state.dishes.push({ id: action.payload.id, title: action.payload.title, priceCents, qty: 1 });
    },
		removeDish(state, action: PayloadAction<{ id: string }>) {
      state.dishes = state.dishes.filter((d) => d.id !== action.payload.id);
    },
		clearDish(state) {
			state.dishes = [];
		},

		setExtraBaggageCount(state, action: PayloadAction<number>) {
			state.extraBaggageCount = normalizeQty(action.payload);
		},

		setPromoCode(state, action: PayloadAction<string | null>) {
			const code = action.payload?.trim() || null;
			state.promoCode = code;
			state.promoRule = code ? promoFromCode(code) : null
		},
		setPromoRule(state, action: PayloadAction<PromoRule | null>) {
			state.promoRule = action.payload;
			state.promoCode = action.payload?.code ?? null;
		},
		resetBill() {
			return initialState;
		}
	}
})

export const {
  setBaseFareCents,
  addDishByText,
  removeDish,
  clearDish,
  setExtraBaggageCount,
  setPromoCode,
  setPromoRule,
  resetBill,
} = slice.actions;

export const billReducer = slice.reducer;





