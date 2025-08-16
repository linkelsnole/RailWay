import { OfferItem } from '../../../entities/offer/ui/OfferItem';
import './AvailableOffers.scss';

export function AvailableOffers() {
  const offers = [
    {
      id: '1',
      description: '50% off up to ₹100 | Use code BOOKNOW',
      code: 'BOOKNOW'
    },
    {
      id: '2', 
      description: '20% off | Use code FIRSTTIME',
      code: 'FIRSTTIME'
    }
  ];

  return (
    <div className="available-offers">
      <h2 className="available-offers__title">Offers</h2>
      
      <div className="available-offers__list">
        {offers.map((offer) => (
          <OfferItem key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
}
