import './ReviewBooking.scss';
import Header from '../../widgets/header/Header';
import Footer from '../../widgets/footer/Footer';
import ContactInfo from '../../widgets/contact-info/ContactInfo';
import { AvailableOffers } from '../../widgets/available-offers/ui/AvailableOffers';
import { ApplyPromoCodeForm } from '../../features/apply-promo-code/ui/ApplyPromoCodeForm';
import { AddExtraBaggageButton } from '../../features/add-extra-baggage/ui/AddExtraBaggageButton';
import { BillSummary } from '../../widgets/bill-summary/ui/BillSummary';
import { MenuHighlights } from '../../widgets/menu-highlights/ui/MenuHighlights';
import { CheckoutActions } from '../../widgets/checkout-actions/ui/CheckoutActions';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setBaseFareCents } from '@/entities/bill/model/billSlice';
import { setAllErrors, clearErrors, type ValidationError } from '@/entities/validation/model/validationSlice';
import type { PassengerContact } from '@/entities/review-booking/contact/model/types';
import { toast } from 'react-toastify';
import { TicketInfo } from '@/widgets/ticket-info/ui/TicketInfo';

const ReviewBooking = () => {
  const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const passengers = useAppSelector((s) => s.contact.passengers);
  const location = useLocation() as { state?: { selectedClass?: { price?: string } } };

  useEffect(() => {
    const priceText = location.state?.selectedClass?.price;
    if (!priceText) return;
    const cents = Math.round(Number(priceText.replace(/[^\d.]/g, '')) * 100);
    if (Number.isFinite(cents)) dispatch(setBaseFareCents(cents));
  }, [dispatch, location.state?.selectedClass?.price]);


	const handleBookingSubmit = () => {
		const errors: ValidationError[] = [];
		passengers.forEach((passenger, index) => {
			const fields: Array<keyof PassengerContact> = ['fullName', 'phone', 'email', 'dateOfBirth'];
			fields.forEach(field => {
				if (!passenger[field]) {
					errors.push({
						passengerIndex: index, field,
					});
				}
			});
		})

		if (errors.length > 0) {
			dispatch(setAllErrors(errors));
			toast.error('Please fill in all required fields');
		} else {
			dispatch(clearErrors());
			navigate('/payment');
		}
	}



  return (
    <>
      <Header theme='dark'/>
      <div className="review-booking container">
            <TicketInfo variant="review" />
        <ContactInfo />
        <MenuHighlights />
        <AvailableOffers />
        <div className="review-booking_utils">
          <ApplyPromoCodeForm />
          <AddExtraBaggageButton />
        </div>
        <BillSummary />
        <CheckoutActions onBookingSubmit={handleBookingSubmit}/>
      </div>
      <Footer />
    </>
  )
}

export default ReviewBooking;