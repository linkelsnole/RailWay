import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  from: string;
  to: string;
  depart: string | null; 
  ret: string | null; 
  passengers: number;
}

const initialState: SearchState = {
  from: '',
  to: '',
  depart: null,
  ret: null,
  passengers: 1,
};

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFrom(state, action: PayloadAction<string>) {
      state.from = action.payload;
    },
    setTo(state, action: PayloadAction<string>) {
      state.to = action.payload;
    },
    setDepart(state, action: PayloadAction<string | null>) {
      state.depart = action.payload;
    },
    setReturn(state, action: PayloadAction<string | null>) {
      state.ret = action.payload;
    },
    setPassengers(state, action: PayloadAction<number>) {
      state.passengers = action.payload;
    },
    setAll(state, action: PayloadAction<Partial<SearchState>>) {
      Object.assign(state, action.payload);
    },
    reset() {
      return initialState;
    },
  },
});

export const { setFrom, setTo, setDepart, setReturn, setPassengers, setAll, reset } = slice.actions;
export const searchReducer = slice.reducer;


