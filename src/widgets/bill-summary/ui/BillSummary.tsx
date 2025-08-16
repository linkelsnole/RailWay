import { BillLineItem } from '../../../entities/bill/ui/BillLineItem';
import './BillSummary.scss';
import { useAppSelector } from '@/app/hooks';
import { selectBillLines, selectTotalDisplay } from '@/entities/bill/model/selectors';

export function BillSummary() {
  const lines = useAppSelector(selectBillLines);
  const total = useAppSelector(selectTotalDisplay);

  return (
    <div className="bill-summary">
      <div className="bill-summary__header">
        <h3 className="bill-summary__title">Bill details</h3>
      </div>

      <div className="bill-summary__items">
        {lines.map((item, index) => (
          <BillLineItem
            key={index}
            label={item.label}
            amount={item.amount}
            isDiscount={item.isDiscount}
          />
        ))}
      </div>

      <div className="bill-summary__total">
        <BillLineItem label="Total Charge" amount={total} isTotal={true} />
      </div>
    </div>
  );
}