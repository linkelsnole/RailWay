import type { Train, ClassInfo } from '@/entities/train/model/types';

export interface BookingMeta {
  pnr?: string;
  transactionId?: string;
  status?: 'draft' | 'confirmed' | 'paid' | 'ticketed';
  seatInfo?: string;
}

export interface BookingState {
  train: Train | null;
  selectedClass: ClassInfo | null;
  meta: BookingMeta;
}