import './BookedTicketQR.scss';
import Button from '../../shared/ui/Button';


export default function BookedTicketQR() {
	return (
		<div className="booked-ticket-qr">
			<img src="" alt="" />
			<div className="booked-ticket-qr__buttons">
				<Button text="Book another ticket" />
				<Button text="Download ticket" />
			</div>
		</div>
	)
}