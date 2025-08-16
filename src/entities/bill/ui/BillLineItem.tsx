import './BillLineItem.scss';

interface BillLineItemProps {
  label: string;
  amount: string;
  isDiscount?: boolean;
  isTotal?: boolean;
}

export function BillLineItem({ label, amount, isDiscount = false, isTotal = false }: BillLineItemProps) {
  return (
    <div className={`bill-line-item ${isTotal ? 'bill-line-item--total' : ''}`}>
      <span className="bill-line-item__label">{label}</span>
      <span className={`bill-line-item__amount ${isDiscount ? 'bill-line-item__amount--discount' : ''}`}>
        {amount}
      </span>
    </div>
  );
}
