import { useAppSelector } from '@/app/hooks';
import type { PassengerContact } from '@/entities/review-booking/contact/model/types';
import { selectFieldError } from '@/features/form-validation/model/selector';
import { IMaskInput } from 'react-imask';

interface FormItemProps {
  passengerIndex: number;
  item: {
    label: string;
    type: string;
    name: keyof PassengerContact;
    placeholder: string;
  };
  passenger: PassengerContact;
  onChange: (field: keyof PassengerContact, value: string) => void;
}

export const FormItem = ({ passengerIndex, item, passenger, onChange }: FormItemProps) => {
  const error = useAppSelector(state => selectFieldError(state, passengerIndex, item.name));

	if (item.name === 'dateOfBirth') {
    return (
      <div className="contact-info__passenger-form-item">
        <label className="contact-info__passenger-form-label">{item.label}</label>
        <IMaskInput
          className={`contact-info__passenger-form-input ${error ? 'input--error' : ''}`}
          mask={Date}
          radix="."
          pattern="d{.}`m{.}`Y"
          placeholder={item.placeholder}
          value={passenger[item.name] ?? ''}
          onAccept={(value: string) => onChange(item.name, value)}
        />
        {error && <span className="error-message">{error.message}</span>}
      </div>
    );
  }

  return (
    <div className="contact-info__passenger-form-item">
      <label className="contact-info__passenger-form-label">{item.label}</label>
      <input
        className={`contact-info__passenger-form-input ${error ? 'input--error' : ''}`}
        type={item.type}
        name={item.name}
        placeholder={item.placeholder}
        value={passenger[item.name] ?? ''}
        onChange={(e) => onChange(item.name, e.target.value)}
      />

      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
};