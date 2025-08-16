import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

export function ScrollToTop() {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === 'PUSH' || navType === 'REPLACE') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, navType]);

  return null;
}

export default ScrollToTop;


