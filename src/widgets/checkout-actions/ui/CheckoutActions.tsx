import './CheckoutActions.scss';

import Button from '../../../shared/ui/Button';

interface CheckoutActionsProps {
	isPayment?: boolean;
	onBookingSubmit: () => void;
}

export function CheckoutActions({ isPayment = false, onBookingSubmit }: CheckoutActionsProps) {
  return (
    <div className="checkout-actions">
			<div className="checkout-actions__suptitle">
				Discounts, offers and price concessions will be applied later during payment
			</div>
      <div className="checkout-actions__buttons">
        <Button className="" text="Book Now" onClick={onBookingSubmit} />
        <Button className="" text="Cancel" type="cancel" to="/trains"/>
      </div>
      
			{!isPayment && (
				<div className="checkout-actions__policies">
					<a href="#" className="checkout-actions__policy-link">Cancellation Policy</a>
					<a href="#" className="checkout-actions__policy-link">Terms & Conditions</a>
					<a href="#" className="checkout-actions__policy-link">Travel Insurance</a>
				</div>
			)}

    </div>
  );
}
