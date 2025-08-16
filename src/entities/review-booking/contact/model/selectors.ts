import type { RootState } from '@/app/store';

export function selectContact(state: RootState) {
	return state.contact.passengers;
}
export function selectTravellerName(state: RootState, index: number) {
	return state.contact.passengers[index]?.fullName ?? '';
}

export function selectTravellerAge(state: RootState, index: number) {
	return state.contact.passengers[index]?.dateOfBirth ?? '';
}

export function selectPassengerCount(state: RootState) {
	return state.contact.passengers.length;
}

export function selectPassengerByIndex(state: RootState, index: number) {
	return state.contact.passengers[index];
}

export function selectPrimaryEmail(state: RootState) {
	return state.contact.passengers[0]?.email ?? '';
}

