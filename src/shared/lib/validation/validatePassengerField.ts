import type {PassengerContact} from '@/entities/review-booking/contact/model/types'

export function validatePassengerField(field: keyof PassengerContact, value: string): string | null {
	switch (field) {
		case 'fullName':
			if (value.trim().length < 2) return 'Name must be at least 2 characters long'
			return null
		case 'email':
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) return 'Please enter a valid email address.'
			return null
		case 'phone':
      const phoneRegex = /^\+?[0-9]{10,12}$/;
      if (!phoneRegex.test(value)) return 'Please enter a valid phone number.';
      return null;
		case 'dateOfBirth':
			if (!value) return 'Date of birth is required.';
			const birthDate = new Date(value);
			if (isNaN(birthDate.getTime()) || birthDate > new Date()) {
				return 'Please enter a valid date in the past.';
			}
			return null;

		default:
			return null;
	}
}