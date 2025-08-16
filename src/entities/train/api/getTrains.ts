import type { Train } from '../model/types';

export async function getTrains(): Promise<Train[]> {
  const res = await fetch('http://localhost:8080/trains');
  if (!res.ok) throw new Error('Failed to load trains');
  return res.json();
}


