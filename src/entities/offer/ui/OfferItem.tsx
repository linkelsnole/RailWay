import type { Offer } from '../model/types';
import './OfferItem.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setPromoCode } from '@/entities/bill/model/billSlice';

interface OfferItemProps {
  offer: Offer;
}

export function OfferItem({ offer }: OfferItemProps) {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((s) => s.bill.promoRule?.code === offer.code);

  const handleToggle = () => {
    if (isActive) dispatch(setPromoCode(null));
    else dispatch(setPromoCode(offer.code));
  };

  return (
    <div className="offer-item">
      <div className="offer-item__content">
        <div className="offer-item__icon">%</div>
        <span className="offer-item__description">{offer.description}</span>
      </div>
      <button
        className={`offer-item__apply ${isActive ? 'active' : ''}`}
        onClick={handleToggle}
      >
        {isActive ? 'Remove' : 'Apply'}
      </button>
    </div>
  );
}