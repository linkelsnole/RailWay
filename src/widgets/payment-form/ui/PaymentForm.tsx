import { useState } from 'react';
import './PaymentForm.scss';
import visa from '../../../shared/icons/payment-cards/Visa.svg';
import mastercard from '../../../shared/icons/payment-cards/mc.svg';
import safe from '../../../shared/icons/safe.svg';
import { useNavigate } from 'react-router';
import { CheckoutActions } from '../../../widgets/checkout-actions/ui/CheckoutActions';
import { Controller, useForm } from 'react-hook-form';
import { IMaskInput, IMask } from 'react-imask'

type CardData = {
	number: string;
	expiry: string;
	cardholder: string;
	cvc: string;
}


export function PaymentForm() {
  const [selectedMethod, setSelectedMethod] = useState('credit-card');
  const navigate = useNavigate();

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CardData>({
		mode: 'onBlur',
	});

	const onValidSubmit = (data: CardData) => {
		console.log('Payment data is valid:', data);
		navigate('/booked-ticket');
	}

  return (
    <div className="payment-form">
      <div className="payment-form__header">
        <h3 className="payment-form__title">Payment Method</h3>
        <p className="payment-form__subtitle">Please enter your payment method</p>
      </div>

      <div className="payment-form__methods">
        <div className={`payment-method ${selectedMethod === 'credit-card' ? 'payment-method--selected' : ''}`}>
          <div className="payment-method__header">
            <div className="payment-method__radio">
              <input 
                type="radio" 
                name="payment" 
                id="credit-card"
                checked={selectedMethod === 'credit-card'}
                onChange={() => setSelectedMethod('credit-card')}
              />
              <label htmlFor="credit-card">Credit Card</label>
            </div>
            <div className="payment-method__logos">
              <img src={visa} alt="VISA" className="payment-method__visa" />
              <img src={mastercard} alt="Mastercard" className="payment-method__mastercard" />
            </div>
          </div>

          {selectedMethod === 'credit-card' && (
            <div className="payment-form__fields">
              <div className="payment-form__field">
                <label className="payment-form__label">Card Number</label>
                <Controller
									name="number"
									control={control}
									rules={{ required: 'Card number is required', pattern: { value: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
									message: 'Invalid card number'} }}
									render={( {field}: {field: any } ) => (
										<IMaskInput
										{...field}
										mask="0000 0000 0000 0000"
										placeholder="0000 0000 0000 0000"
										className={`payment-form__input ${errors.number ? 'input--error' : ''}`}
									/>
									)}
								/>
              </div>
              
              {/* Поле даты с маской */}
              <div className="payment-form__field">
                <label className="payment-form__label">Expiration Date</label>
                <Controller
                  name="expiry"
                  control={control}
                  rules={{ required: 'Expiry date is required', pattern: { value: /^(0[1-9]|1[0-2])\s\/\s\d{2}$/, message: 'Invalid date format' } }}
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask="MM / YY"
                      blocks={{
                        MM: { mask: IMask.MaskedRange, from: 1, to: 12 },
                        YY: { mask: IMask.MaskedRange, from: new Date().getFullYear() % 100, to: 99 },
                      }}
                      placeholder="MM / YY"
                      className={`payment-form__input ${errors.expiry ? 'input--error' : ''}`}
                    />
                  )}
                />
                {errors.expiry && <span className="error-message">{errors.expiry.message}</span>}
              </div>
              
              <div className="payment-form__field">
                <label className="payment-form__label">Cardholder</label>
                <input 
                  type="text"
                  className={`payment-form__input ${errors.cardholder ? 'input--error' : ''}`}
                  placeholder="Cardholder name"
                  {...register('cardholder', { required: 'Cardholder name is required' })}
                />
                {errors.cardholder && <span className="error-message">{errors.cardholder.message}</span>}
              </div>
              
              <div className="payment-form__field">
                <label className="payment-form__label">CVC</label>
                <input 
                  type="text"
                  className={`payment-form__input ${errors.cvc ? 'input--error' : ''}`}
                  placeholder="CVC"
                  {...register('cvc', { 
                    required: 'CVC is required', 
                    minLength: { value: 3, message: 'CVC must be 3-4 digits' },
                    maxLength: { value: 4, message: 'CVC must be 3-4 digits' },
                    pattern: { value: /^\d{3,4}$/, message: 'CVC must contain only digits' }
                  })}
                />
                {errors.cvc && <span className="error-message">{errors.cvc.message}</span>}
              </div>

            </div>
          )}
        </div>

        <div className={`payment-method ${selectedMethod === 'paypal' ? 'payment-method--selected' : ''}`}>
          <div className="payment-method__header">
            <div className="payment-method__radio">
              <input 
                type="radio" 
                name="payment" 
                id="paypal"
                checked={selectedMethod === 'paypal'}
                onChange={() => setSelectedMethod('paypal')}
              />
              <label htmlFor="paypal">PayPal</label>
            </div>
          </div>
        </div>

        <div className={`payment-method ${selectedMethod === 'bitcoin' ? 'payment-method--selected' : ''}`}>
          <div className="payment-method__header">
            <div className="payment-method__radio">
              <input 
                type="radio" 
                name="payment" 
                id="bitcoin"
                checked={selectedMethod === 'bitcoin'}
                onChange={() => setSelectedMethod('bitcoin')}
              />
              <label htmlFor="bitcoin">Bitcoin</label>
            </div>
          </div>
        </div>
      </div>

      <div className="payment-form__security">
        <img src={safe} alt="Security" className="payment-form__security-icon" />
        <span className="payment-form__security-text">All your data are safe</span>
      </div>

			<CheckoutActions isPayment={true} onBookingSubmit={handleSubmit(onValidSubmit)}/>
    </div>
  );
}
