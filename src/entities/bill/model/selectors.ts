import type { RootState } from "@/app/store";

function formatCentsToDollars(cents: number): string {
  const dollars = (cents / 100);
  return `$${dollars}`;
}

// Сумма за базовый тариф за пассажира || несколько пассажиров
export function selectBaseFareTotalCents(state: RootState) {
  const perPassenger = state.bill.baseFareCents;
  const passengers = state.search.passengers || 1;
  return perPassenger * passengers;
}

// Подсчет суммы за все блюда
export function selectDishesSubtotalCents(state: RootState) {
  return state.bill.dishes.reduce((sum, d) => sum + d.priceCents * d.qty, 0);
}

// Подсчет суммы за все дополнительные багаж
export function selectExtraBaggageTotalCents(state: RootState) {
	const count = state.bill.extraBaggageCount;
	const unit = state.bill.extraBaggageUnitCents;
	return count * unit;
}

// Сумма всегоl до вычета налога и скидки 
export function selectSubtotalBeforeTaxCents(state: RootState) {
	return selectBaseFareTotalCents(state) + selectDishesSubtotalCents(state) + selectExtraBaggageTotalCents(state);
}

// Вычисление налога от суммы (18%)
export function selectTaxCents(state: RootState) {
	return Math.round(selectSubtotalBeforeTaxCents(state) * 0.18);
}

// Проверка: есть ли промокод, какой у него тип<процент или сумма>
export function selectDiscountCents(state: RootState) {
	const rule = state.bill.promoRule;
	if (!rule) return 0;
	
	const base = selectSubtotalBeforeTaxCents(state);
	if (base <= 0) return 0;

  if (rule.type === 'flat') {
    const raw = rule.value;
    const cap = rule.maxOffCents ?? raw;
    return Math.min(raw, cap, base);
  }
  const raw = Math.round((base * rule.value) / 100);
  const cap = rule.maxOffCents ?? raw;
  return Math.min(raw, cap);
}

// ИТОГОВАЯ СУММА ПО СЧЕТУ
export function selectTotalCents(state: RootState) {
	return selectSubtotalBeforeTaxCents(state) + selectTaxCents(state) - selectDiscountCents(state);
}





export function selectBillLines(state: RootState) {
  const lines: Array<{ label: string; amount: string; isDiscount?: boolean }> = [];
  const passengers = state.search.passengers || 1;

  const base = selectBaseFareTotalCents(state);
  if (base > 0) {
    const per = state.bill.baseFareCents;
    lines.push({
      label: passengers > 1 ? `Base Ticket Fare (x${passengers})` : 'Base Ticket Fare',
      amount: formatCentsToDollars(base),
    });
    if (passengers > 1) {
      void per;
    }
  }

  state.bill.dishes.forEach((d) => {
    lines.push({
      label: d.qty > 1 ? `${d.title} (x${d.qty})` : d.title,
      amount: formatCentsToDollars(d.priceCents * d.qty),
    });
  });

  const extra = selectExtraBaggageTotalCents(state);
  if (extra > 0) {
    lines.push({
      label:
        state.bill.extraBaggageCount > 1
          ? `Extra Baggage (x${state.bill.extraBaggageCount})`
          : 'Extra Baggage',
      amount: formatCentsToDollars(extra),
    });
  }

  const tax = selectTaxCents(state);
  if (tax > 0) {
    lines.push({ label: 'CGST & SGST', amount: formatCentsToDollars(tax) });
  }

  const discount = selectDiscountCents(state);
  if (discount > 0) {
    lines.push({ label: 'Discount', amount: `-${formatCentsToDollars(discount)}`, isDiscount: true });
  }

  return lines;
}


export function selectTotalDisplay(state: RootState) {
	return formatCentsToDollars(selectTotalCents(state))
}