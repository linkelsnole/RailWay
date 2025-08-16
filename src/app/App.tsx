import './styles/index.scss'
import { Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import HomePage from '../pages/home-page/HomePage';
import TrainsList from '../pages/trains-list/TrainsList';
import ReviewBooking from '../pages/review-booking/ReviewBooking';
import { PaymentPage } from '../pages/payment/PaymentPage';
import { BookedTicketPage } from '../pages/booked-ticket-page/BookedTicketPage';
import ScrollToTop from './ScrollToTop';


function App() {

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
				<Route path="/trains" element={<TrainsList />} />
				<Route path="/review-booking" element={<ReviewBooking />} />
				<Route path="/payment" element={<PaymentPage />} />
				<Route path="/booked-ticket" element={<BookedTicketPage />} />
      </Routes>
			<ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
		
  )
}

export default App
