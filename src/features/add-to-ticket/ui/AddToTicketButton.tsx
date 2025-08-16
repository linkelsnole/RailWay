import './AddToTicketButton.scss';

interface AddToTicketButtonProps {
  onClick?: () => void;
	isAdded:  boolean;
}

export function AddToTicketButton({ onClick, isAdded }: AddToTicketButtonProps) {
	const buttonText = isAdded ? 'Remove' : 'Add to Ticket';
  const buttonClass = `add-to-ticket-button ${isAdded ? 'added' : ''}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {buttonText}
    </button>
  );
}
