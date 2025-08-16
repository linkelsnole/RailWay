import './ContactInfo.scss';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setPassengerCount, setPassengerField } from '@/entities/review-booking/contact/model/contactSlice';
import type { PassengerContact } from '@/entities/review-booking/contact/model/types';
import { FormItem } from './ui/FormItem';

interface ContactInfoProps {
	countPassengers?: number;
}

// const buildFormItem = (
// 	passenger: PassengerContact,
// 	index: number,
// 	isError: (field: keyof PassengerContact) => boolean,
// 	onChange: (field: keyof PassengerContact, value: string) => void
// ) => {

// 	const  items: Array<{label: string, type: string, name: keyof PassengerContact, placeholder: string}> = [
// 		{label: 'Full Name', type: 'text', name: 'fullName', placeholder: 'Your Name'},
// 		{label: 'Phone Number', type: 'tel', name: 'phone', placeholder: '+91'},
// 		{label: 'Email', type: 'email', name: 'email', placeholder: 'john.doe@example.com'},
// 		{label: 'Date of Birth', type: 'date', name: 'dateOfBirth', placeholder: '12.12.1990'},
// 	]

// 	return items.map((item, i) => {
// 		const hasError = isError(item.name);
// 		return (
// 			<div className="contact-info__passenger-form-item" key={`${index}-${i}`}>
// 				<label className="contact-info__passenger-form-label">{item.label}</label>
// 				<input className={`contact-info__passenger-form-input ${hasError ? 'input--error' : ''}`} 
// 					type={item.type} name={item.name} 
// 					placeholder={item.placeholder} 
// 					value={passenger[item.name] ?? ''}
// 					onChange={(e) => onChange(item.name, e.target.value)}
// 				/>
// 				{hasError && <span className="error-message">This field is required</span>}
// 			</div>
// 		)
// 	})
// }

const formItemsConfig: Array<{label: string, type: string, name: keyof PassengerContact, placeholder: string}> = [
  {label: 'Full Name', type: 'text', name: 'fullName', placeholder: 'Your Name'},
  {label: 'Phone Number', type: 'tel', name: 'phone', placeholder: '+91'},
  {label: 'Email', type: 'email', name: 'email', placeholder: 'john.doe@example.com'},
  {label: 'Date of Birth', type: 'text', name: 'dateOfBirth', placeholder: 'DD.MM.YYYY'},
];

const ContactInfo = ({countPassengers}: ContactInfoProps) => {
	const dispatch = useAppDispatch();

	const searchPassengers = useAppSelector((s) => s.search.passengers)
	const passengers = useAppSelector((s) => s.contact.passengers)

	const targetCount = useMemo(
		() => (typeof countPassengers === 'number' ? countPassengers : searchPassengers),
		[countPassengers, searchPassengers]
	)

	useEffect(() => {
		dispatch(setPassengerCount(targetCount ?? 1));
	}, [dispatch, targetCount])

	return (
		<div className="contact-info">
			{passengers.map((p, i) => {
				return (
					<div className="contact-info__passenger" key={i}>
						<div className="contact-info__passenger-title">Passenger {i + 1}</div>
						<div className="contact-info__passenger-subtitle">Please enter your contact info</div>
						<div className="contact-info__passenger-form">
							{formItemsConfig.map((item, itemIndex) => (
								<FormItem
									key={itemIndex}
									passengerIndex={i}
									item={item}
									passenger={p}
									onChange={(field, value) => dispatch(setPassengerField({index: i, field, value}))}
								/>
							))}
						</div>
					</div>
				);
			})}
		</div>
	)
}

export default ContactInfo;