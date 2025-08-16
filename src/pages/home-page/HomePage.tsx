import Header from '../../widgets/header/Header';
import './homePage.scss';
import TicketSearchForm from '../../widgets/ticket-search-form/TicketSearchForm';

const HomePage = () => {
	return (
		<div className='home'>
			<Header theme='light' />
			<div className="home__content">
					<h1 className='home__content-title'>Let's Find That Ticket</h1>
					<h3 className='home__content-subtitle'>before Someone Else Does</h3>
					<div className='home__content-ticket-search-form'>
						<TicketSearchForm />
					</div>
			</div>
		</div>
	)
}


export default HomePage;