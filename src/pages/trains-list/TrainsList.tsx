import Header from '../../widgets/header/Header';
import './trainsList.scss';
import TicketSearchForm from '../../widgets/ticket-search-form/TicketSearchForm';
import Footer from '../../widgets/footer/Footer';
import TrainCard from '../../widgets/train-card/ui/TrainCard';
import { useEffect, useRef, useState, useMemo } from 'react';
import { getTrains } from '../../entities/train/api/getTrains';
import type { Train, ClassInfo } from '../../entities/train/model/types';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { parseSearchQuery } from '@/entities/search/model/url';
import { setAll } from '@/entities/search/model/searchSlice';
import { setSelection } from '@/entities/booking/model/bookingSlice';



const TrainsList = () => {
    const [trains, setTrains] = useState<Train[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const availableRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
		const searchParams = useAppSelector(state => state.search)

		//загрузка поездов
    useEffect(() => {
        getTrains().then(setTrains).catch(console.error);
    }, []);



    useEffect(() => {
        const next = parseSearchQuery(location.search);
        dispatch(setAll(next));
    }, [location.search, dispatch]);

		const filteredTrains = useMemo(() => {
			const { from, to, depart, ret } = searchParams;

			if (!from && !to && !depart) {
				return trains;
			}

			return trains.filter((t) => {
				const matchFrom = from ? t.departure.station === from : true; //любой поезд подходит, если нет откуда
				const matchTo = to ? t.arrival.station === to : true;

				const matchDepart = (() => {
					if (!depart) return true;

					try {
						const searchDate = new Date(depart);
						const trainDate = new Date(`${t.departure.date} ${searchDate.getFullYear()}`);
						
						console.log(searchDate.toDateString(), trainDate.toDateString());
						return searchDate.toDateString() === trainDate.toDateString();
					} catch (e) {
						return false;
					}
				})();

				const matchReturn = (() => {
					if (!ret) { // 
							return true;
					}
          try {
						const searchDate = new Date(ret);
						const trainDate = new Date(`${t.arrival.date} ${searchDate.getFullYear()}`);

						console.log(searchDate.toDateString(), trainDate.toDateString());
						return searchDate.toDateString() === trainDate.toDateString();
					} catch {
						return false;
					}
				})();
				return matchFrom && matchTo && matchDepart && matchReturn;
			})
		}, [trains, searchParams])


		useEffect(() => {
			if (filteredTrains.length && availableRef.current) {
				availableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'})
			}
		}, [filteredTrains])


    function handleSelectClass(train: Train, selectedClass: ClassInfo) {
			dispatch(setSelection({ train, selectedClass }));
			navigate('/review-booking', { state: { train, selectedClass } });
    }

    return (
		<div className='trains-list'>
			<Header theme='dark'/>
			<div className='trains-list__content container'>
				<h2 className='trains-list__title'>Search Results</h2>
				<TicketSearchForm  isMain={true}/>

				<div className="trains-list__footer-cards">
					<div className="trains-list__footer-card">

				</div>
				<div className="trains-list__footer-card">

				</div>
				<p>Our trains don't just transport people, they transport emotions and stories! From the mountains of Darjeeling to the beaches of Goa, we connect more than just stations. As Raj Koothrappali would say, "In India, we don't just ride trains, we experience cosmic journeys with occasional cow delays." Book now and embrace the colorful chaos!</p>
			</div>

            <div className="trains-list__available-trains" ref={availableRef}>
                <h2 className="trains-list__available-trains-title">Available trains</h2>
                <div className="trains-list__cards">
                    {filteredTrains.map((train) => (
                        <TrainCard
                          key={train.id}
                          train={train}
                          onSelectClass={(cls) => handleSelectClass(train, cls)}
                        />
                    ))}
                </div>
            </div>

			
		</div>

		<Footer />
	</div>
	)
}

export default TrainsList;