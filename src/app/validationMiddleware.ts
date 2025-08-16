import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { setPassengerField } from '@/entities/review-booking/contact/model/contactSlice';
import { setError, removeError } from '@/entities/validation/model/validationSlice';
import { validatePassengerField } from '@/shared/lib/validation/validatePassengerField';
import type { PassengerContact } from '@/entities/review-booking/contact/model/types';


export const validationListenerMiddleware = createListenerMiddleware();

validationListenerMiddleware.startListening({
	matcher: isAnyOf(setPassengerField),
	effect: async (action, listenerApi) => {
		const {index, field, value} = action.payload as {index: number, field: keyof PassengerContact, value: string};
		const errorMessage = validatePassengerField(field, value);

		if (errorMessage) { //в зависимости от результата, диспатчим экшен из validationSlice
			listenerApi.dispatch(setError({passengerIndex: index, field, message: errorMessage}));
		} else {
			listenerApi.dispatch(removeError({passengerIndex: index, field}));
		}
	}
})