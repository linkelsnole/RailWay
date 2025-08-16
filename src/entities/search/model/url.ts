import type { SearchState } from './searchSlice';

export function buildSearchQuery(state: SearchState): string {
  const params = new URLSearchParams();
  if (state.from) params.set('from', state.from);
  if (state.to) params.set('to', state.to);
  if (state.depart) params.set('depart', state.depart);
  if (state.ret) params.set('return', state.ret);
  params.set('passengers', String(state.passengers));
  const query = params.toString();
  return query ? `?${query}` : '';
}

export function parseSearchQuery(search: string): Partial<SearchState> {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);

  const from = params.get('from') ?? '';
  const to = params.get('to') ?? '';
  const depart = params.get('depart');
  const ret = params.get('return');
  const passengersRaw = params.get('passengers');
	
  const passengers = passengersRaw ? Math.max(1, Math.min(10, Number(passengersRaw))) : 1;
  return { from, to, depart: depart ?? null, ret: ret ?? null, passengers };
}


