import type { RootState } from "@/app/store";
import type { PassengerContact } from '@/entities/review-booking/contact/model/types';

export const selectFieldError = (state: RootState, passengerIndex: number, field: keyof PassengerContact) => {
	return state.validation.errors.find(e => e.passengerIndex === passengerIndex && e.field === field);
}

export const selectAllErrors = (state: RootState) => state.validation.errors;