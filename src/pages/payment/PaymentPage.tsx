import  Header  from '../../widgets/header/Header';
import  Footer  from '../../widgets/footer/Footer';
import { TicketInfo } from '../../widgets/ticket-info/ui/TicketInfo';
import { BillSummary } from '../../widgets/bill-summary/ui/BillSummary';
import { PaymentForm } from '../../widgets/payment-form/ui/PaymentForm';
import { selectTotalDisplay } from '@/entities/bill/model/selectors';

import './PaymentPage.scss';
import { useAppSelector } from '@/app/hooks'


export function PaymentPage() {
	const totalDisplay = useAppSelector(b => selectTotalDisplay(b));
	
  

  return (
    <div className="payment-page">
      <Header  theme='dark'/>
      
      <main className="payment-page__content container">
        <div className="payment-page__container">
          <h1 className="payment-page__title">Pay {totalDisplay} to confirm booking</h1>
          
          <div className="payment-page__main">

              <TicketInfo variant="payment" />

              <BillSummary />
              <PaymentForm />
							<div className="checkout-actions__policies">
								<a href="#" className="checkout-actions__policy-link">Cancellation Policy</a>
								<a href="#" className="checkout-actions__policy-link">Terms & Conditions</a>
								<a href="#" className="checkout-actions__policy-link">Travel Insurance</a>
							</div>
          </div>
        </div>
      </main>
			
      <Footer />
    </div>
  );
}
