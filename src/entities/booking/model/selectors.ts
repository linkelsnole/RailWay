import type { RootState } from '@/app/store';

export const selectSelectedTrain = (s: RootState) => s.booking.train;
export const selectSelectedClass = (s: RootState) => s.booking.selectedClass;
export const selectBookingMeta = (s: RootState) => s.booking.meta;