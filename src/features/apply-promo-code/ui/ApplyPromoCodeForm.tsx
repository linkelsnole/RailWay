import './ApplyPromoCodeForm.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setPromoCode } from '@/entities/bill/model/billSlice';

export function ApplyPromoCodeForm() {
	const dispatch = useAppDispatch();
	const activeCode = useAppSelector((s) => s.bill.promoCode);

	const handleChange = (next: string) => {
		dispatch(setPromoCode(next));
	}

  return (
    <div className="apply-promo-code">
      <div className="apply-promo-code__header">
        <h3 className="apply-promo-code__title">Apply Code</h3>
      </div>
      
      <div className="apply-promo-code__input-wrapper">
        <input 
          type="text"
          className="apply-promo-code__input"
          placeholder="Enter Code"
          value={activeCode ?? ''}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
}
