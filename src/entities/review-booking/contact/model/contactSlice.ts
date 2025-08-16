import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactState, PassengerContact } from './types';


function createEmptyPassengerContact(): PassengerContact {
	return {
		fullName: '',
		phone: '',
		email: '',
		dateOfBirth: '',
	}
}

const initialState: ContactState = {
	passengers: [createEmptyPassengerContact()],
}

const slice = createSlice({
	name: 'contact',
	initialState,
	reducers: {

		setPassengerCount: (state, action: PayloadAction<number>) => {
			const count = Math.max(1, action.payload | 0)
			const curr = state.passengers.length;

			if (count > curr) {
				for (let i = curr; i < count; i++) {
					state.passengers.push(createEmptyPassengerContact())
				}
			} else if (count < curr) {
				state.passengers = state.passengers.slice(0, count);
			}
		},

		setPassengerField(
			state,
			action: PayloadAction<{index: number, field: keyof PassengerContact, value: string}>
		) {
			const {index, field, value} = action.payload;
			if (index < 0 || index >= state.passengers.length) 
				return;
			state.passengers[index][field] = value;
		},

		setAll(state, action: PayloadAction<PassengerContact[]>) {
			state.passengers = action.payload.slice();
		},
		reset() {
			return initialState;
		},
	},
});

export const {setPassengerCount, setPassengerField, setAll, reset} = slice.actions;
export const contactReducer = slice.reducer;