import './BookedTicketPage.scss';

import Header from '../../widgets/header/Header';
import success from '../../shared/icons/booked-ticket/success.svg';
import BookedTicketQR from '../../widgets/booked-ticket-qr/BookedTicketQR'
import Footer from '../../widgets/footer/Footer';
import { TicketInfo } from '../../widgets/ticket-info/ui/TicketInfo';

export function BookedTicketPage() {
  return (
		<>
		<Header theme="dark"/>
    <div className="booked-ticket container">
      <div className="booked-ticket__success">
				<img src={success} alt="success" />
				<div className="booked-ticket__success-description">
					Congratulations!<br /> You have successfully booked tickets.
				</div>
			</div>
			<div className="booked-ticket__container">
            <TicketInfo variant="booked" />
				<BookedTicketQR />
			</div>


			<div className="checkout-actions__policies">
								<a href="#" className="checkout-actions__policy-link">Cancellation Policy</a>
								<a href="#" className="checkout-actions__policy-link">Terms & Conditions</a>
								<a href="#" className="checkout-actions__policy-link">Travel Insurance</a>
							</div>
    </div>

		<Footer />
		</>
  );
}