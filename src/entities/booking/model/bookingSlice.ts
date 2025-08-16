// src/entities/booking/model/bookingSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BookingState, BookingMeta } from './types';
import type { Train, ClassInfo } from '@/entities/train/model/types';

const initialState: BookingState = {
  train: null,
  selectedClass: null,
  meta: {},
};

const slice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelection(state, action: PayloadAction<{ train: Train; selectedClass: ClassInfo }>) {
      state.train = action.payload.train;
      state.selectedClass = action.payload.selectedClass;
    },
    setMeta(state, action: PayloadAction<Partial<BookingMeta>>) {
      state.meta = { ...state.meta, ...action.payload };
    },
    resetBooking() {
      return initialState;
    },
  },
});

export const { setSelection, setMeta, resetBooking } = slice.actions;
export const bookingReducer = slice.reducer;