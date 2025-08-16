import './TrainCard.scss';
import type { Train, ClassInfo } from '../../../entities/train/model/types';
import { ClassAvailabilityCard } from '../../../features/select-train-class/ui/ClassAvailabilityCard';

export interface TrainCardProps { 
	train: Train; onSelectClass?: (classInfo: ClassInfo) => void 
}


const TrainCard = ({ train, onSelectClass }: TrainCardProps) => {
	return (
		<div className="train-card">
			<div className="train-card__header">
				<span className="train-card__header-number">{train.number}</span> –
				<span className="train-card__header-name">{train.name}</span>
			</div>
			<div className="train-card__runs-on">
				<span>Runs on</span>
				<button className='train-card__runs-on-button'>{train.runsOn}</button>
			</div>
			<div className="train-card_details">

				<div className='train-card__departure'>
          <div className='train-card__date'>{train.departure.date}</div>
          <div className='train-card__time'>{train.departure.time}</div>
          <div className='train-card__station'>{train.departure.station}</div>
        </div>

				<div className='train-card__duration'>{train.duration}</div>

				<div className='train-card__arrival'>
          <div className='train-card__date'>{train.arrival.date}</div>
          <div className='train-card__time'>{train.arrival.time}</div>
          <div className='train-card__station'>{train.arrival.station}</div>
        </div>

			</div>

			<div className="train-card_classes">
				{train.classes.map((classInfo: ClassInfo) => (
					<ClassAvailabilityCard key={classInfo.type} classInfo={classInfo} onClick={onSelectClass} />
				))}
			</div>
		</div>
	)
}

export default TrainCard;