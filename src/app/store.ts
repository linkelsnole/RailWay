import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from '../entities/search/model/searchSlice';
import { contactReducer } from '../entities/review-booking/contact/model/contactSlice';
import { billReducer } from '../entities/bill/model/billSlice';
import validationReducer from '../entities/validation/model/validationSlice';
import { bookingReducer } from '../entities/booking/model/bookingSlice';
import { validationListenerMiddleware } from './validationMiddleware';

export const store = configureStore({
  reducer: {
    search: searchReducer,
		contact: contactReducer,
		bill: billReducer,
		validation: validationReducer,
		booking: bookingReducer,
  },
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(validationListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;