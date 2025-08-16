import { Link } from 'react-router';
import './Button.scss';

interface ButtonProps {
  className?: string;
  text: string;
  onClick?: () => void;
  to?: string; 
  href?: string; 
  type?: 'default' | 'cancel';
	disabled?: boolean;
}

const Button = ({ className, text, onClick, to, href, type = 'default'}: ButtonProps) => {
  const baseClass = type === 'cancel' ? 'cancel' : 'button';
  const combinedClassName = `${baseClass} ${className || ''}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {text}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {text}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedClassName}>
      {text}
    </button>
  );
};

export default Button;