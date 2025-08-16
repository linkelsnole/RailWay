import './ClassAvailabilityCard.scss';
import type { ClassInfo } from '../../../entities/train/model/types';

interface ClassAvailabilityCardProps {
  classInfo: ClassInfo;
  onClick?: (classInfo: ClassInfo) => void;
}

function getCardClass(classInfo: ClassInfo): string {
  if (classInfo.status.startsWith('WL')) return 'status-waitlist';
  if (classInfo.type === '3A') return 'status-available';
  return 'status-default';
}

export function ClassAvailabilityCard({ classInfo, onClick }: ClassAvailabilityCardProps) {
  const cardClass = getCardClass(classInfo);
  return (
    <button className={`class-card ${cardClass}`} onClick={() => onClick?.(classInfo)}>
      <div className="class-card__type">{classInfo.type}</div>
      <div className="class-card__status">{classInfo.status}</div>
      <div className="class-card__quota">{classInfo.quota}</div>
      <div className="class-card__price">₹{classInfo.price}</div>
    </button>
  );
}

export default ClassAvailabilityCard;


