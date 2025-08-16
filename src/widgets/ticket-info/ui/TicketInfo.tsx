import './TicketInfo.scss';
import type { Train, ClassInfo } from '../../../entities/train/model/types';
import { useAppSelector } from '@/app/hooks';
import { selectSelectedTrain, selectSelectedClass, selectBookingMeta } from '@/entities/booking/model/selectors';
import { selectPrimaryEmail, selectContact } from '@/entities/review-booking/contact/model/selectors';
import { selectTotalDisplay } from '@/entities/bill/model/selectors';

import { differenceInYears } from 'date-fns';


interface TicketInfoProps {
  variant?: 'review' | 'payment' | 'booked';
  train?: Train;
  selectedClass?: ClassInfo;
  email?: string;
}

export function TicketInfo({ variant = 'payment', train: trainProp, selectedClass: classProp, email: emailProp }: TicketInfoProps) {
  const train = useAppSelector(selectSelectedTrain) ?? trainProp;
  const selectedClass = useAppSelector(selectSelectedClass) ?? classProp;
  const email = useAppSelector(selectPrimaryEmail) || emailProp || 'Koothrappali@gmail.com';
  const meta = useAppSelector(selectBookingMeta);
	const passengers = useAppSelector(selectContact);

  const extraBaggageCount = useAppSelector((s) => s.bill.extraBaggageCount);
  const dishes = useAppSelector((s) => s.bill.dishes);
  const totalDisplay = useAppSelector((s) => selectTotalDisplay(s));

	const changeBackground = () => {
		if (variant === 'booked') {
			return 'white'
		}
		return ''
	}

  return (
    <div className={`ticket-info ${changeBackground()}`}>
      {variant === 'booked' && (
        <div className="ticket-info__meta">
          <div className="ticket-info__meta-item">PNR No: {meta?.pnr ?? '1234567890'}</div>
          <div className="ticket-info__meta-item">Transaction ID : {meta?.transactionId ?? '351511859256378'}</div>
        </div>
      )}
      <div className="ticket-info__header">
        <h2 className="ticket-info__title">Boarding Details</h2>
      </div>

      <div className="ticket-info__train">
        <h3 className="ticket-info__train-name">
          {train ? `${train.number} - ${train.name}` : '22426 - VANDE BHARAT'}
        </h3>
        <p className="ticket-info__train-class">
          {selectedClass ? `Class ${selectedClass.type} & ${selectedClass.quota} Quota` : 'Class 2A & Tatkal Quota'}
        </p>
      </div>

      <div className="ticket-info__journey">
        <div className="ticket-info__departure">
          <div className="ticket-info__date">{train?.departure.date ?? 'Nov 16'}</div>
          <div className="ticket-info__time-location">
            <div className="ticket-info__time">{train?.departure.time ?? '11:25 pm'}</div>
            <div className="ticket-info__location">{train?.departure.station ?? 'New Delhi - NDLS'}</div>
          </div>
        </div>

        <div className="ticket-info__duration">
          <span className="ticket-info__duration-text">{train?.duration ?? '8 hours'}</span>
        </div>

        <div className="ticket-info__arrival">
          <div className="ticket-info__date">{train?.arrival.date ?? 'Nov 17'}</div>
          <div className="ticket-info__time-location">
            <div className="ticket-info__time">{train?.arrival.time ?? '7:25 am'}</div>
            <div className="ticket-info__location">{train?.arrival.station ?? 'Lucknow - LJN'}</div>
          </div>
        </div>
      </div>

      {variant === 'booked' && (
        <div className={`ticket-info__traveller`}>
          <h3 className="ticket-info__section-title">Traveller Details</h3>
          <div className="ticket-info__traveller-item">
						{passengers.map((p, index) => {
							const age = differenceInYears(new Date(), new Date(p.dateOfBirth));
							return (
								<>
									<div key={index} className="ticket-info__traveller-entry">
										<span className="ticket-info__traveller-name">{p.fullName}</span>
										<span className="ticket-info__traveller-age">{age} Yrs</span>
									</div>
								</>
							)
					})}
          </div>
					
					<div className="ticket-info__booking-details">
						<div className="ticket-info__traveller-item ">Booking Status : Confirmed (CNF)</div>
						{selectedClass && (
							<div className="ticket-info__traveller-item ">
								Seat/Coach no. : Class {selectedClass.type} & {selectedClass.quota} Quota
							</div>
										)}
						
											{extraBaggageCount > 0 && (
												<div className="ticket-info__traveller-item">
													<span className="ticket-info__traveller-name baggage">Extra Baggage : {extraBaggageCount}</span>
												</div>
											)}
						
											{dishes.map((d) => (
												<div className="ticket-info__traveller-item" key={d.id}>
													<span className="ticket-info__traveller-name dish">{d.title} : {d.qty}</span>
												</div>
											))}
										</div>
					</div>
      )}

			{variant === 'payment' && (
        <div className={`ticket-info__traveller`}>
          <h3 className="ticket-info__section-title">Traveller Details</h3>
          <div className="ticket-info__traveller-item">
						{passengers.map((p, index) => {
							const age = differenceInYears(new Date(), new Date(p.dateOfBirth));
							return (
								<>
									<div key={index} className="ticket-info__traveller-entry">
										<span className="ticket-info__traveller-name">{p.fullName}</span>
										<span className="ticket-info__traveller-age">{age} Yrs</span>
									</div>
								</>
							)
					})}
          </div>
					


          {extraBaggageCount > 0 && (
            <div className="ticket-info__traveller-item">
              <span className="ticket-info__traveller-name">Extra Baggage</span>
              <span className="ticket-info__traveller-age">{extraBaggageCount}</span>
            </div>
          )}

          {dishes.map((d) => (
            <div className="ticket-info__traveller-item" key={d.id}>
              <span className="ticket-info__traveller-name">{d.title}</span>
              <span className="ticket-info__traveller-age">{d.qty}</span>
            </div>
          ))}
        </div>
      )}



			{(variant === 'payment' || variant === 'booked') && (
				<div className="ticket-info__contact">
					<div className="ticket-info__contact-label">E-Tickets will be sent to:</div>
					<div className="ticket-info__email">{email}</div>
				</div>
			)}


      {variant === 'booked' && (
        <div className="ticket-info__total">
          <h3 className="ticket-info__section-title">Total Fare</h3>
          <div className="ticket-info__total-amount">{totalDisplay}</div>
        </div>
      )}
    </div>
  );
}

