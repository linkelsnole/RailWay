import './AddExtraBaggageButton.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setExtraBaggageCount } from '@/entities/bill/model/billSlice';

export function AddExtraBaggageButton() {

	const dispatch = useAppDispatch();
	const extraBaggageCount = useAppSelector((state) => state.bill.extraBaggageCount);
	const maxPassengers = useAppSelector((state) => state.search.passengers);

	const handleAddExtraBaggage = () => {
		if (extraBaggageCount < maxPassengers) {
			dispatch(setExtraBaggageCount(extraBaggageCount + 1))
		}
	}
	const handleRemoveExtraBaggage = () => {
		dispatch(setExtraBaggageCount(extraBaggageCount - 1))
	}

  return (
    <div className="extra-baggage">
      <div className="extra-baggage__header">
        <h3 className="extra-baggage__title">Extra Baggage</h3>
      </div>
      
      <div className="extra-baggage__action">
        <button className="extra-baggage__button" onClick={handleAddExtraBaggage}>
          Add to Ticket
        </button>
				<button className="extra-baggage__button remove" onClick={handleRemoveExtraBaggage}>
          Remove
        </button>
      </div>
    </div>
  );
}
