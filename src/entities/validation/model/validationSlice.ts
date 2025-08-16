import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { PassengerContact } from '@/entities/review-booking/contact/model/types'

export interface ValidationError {
	passengerIndex: number;
	field: keyof PassengerContact;
	message?: string;
}

interface ValidationState {
	errors: ValidationError[];
}

const initialState: ValidationState = {
	errors: [],
}

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
		setError(state, action: PayloadAction<ValidationError>) {
			const filteredErrors = state.errors.filter(e => !(e.passengerIndex === action.payload.passengerIndex && e.field === action.payload.field));
			state.errors = [...filteredErrors, action.payload];
		},
		removeError(state, action: PayloadAction<Omit<ValidationError, 'message'>>) {
			state.errors = state.errors.filter(e => !(e.passengerIndex === action.payload.passengerIndex && e.field === action.payload.field))
		},
    setAllErrors(state, action: PayloadAction<ValidationError[]>) {
      state.errors = action.payload;
    },
    clearErrors(state) {
      state.errors = [];
    },
  },
});

export const { setError, removeError, setAllErrors, clearErrors } = validationSlice.actions;
export default validationSlice.reducer;