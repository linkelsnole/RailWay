import './TicketSearchForm.scss';
import person from '../../shared/icons/person.svg';
import Button from '../../shared/ui/Button';
import { Calendar } from "@/shared/ui/calendarCN"
import { useMemo, useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setFrom, setTo, setDepart, setReturn, setPassengers } from '@/entities/search/model/searchSlice';
import { buildSearchQuery } from '@/entities/search/model/url';

const TicketSearchForm = ({isMain = false}: {isMain?: boolean}) => {
    const dispatch = useAppDispatch();
    const search = useAppSelector((s) => s.search);

    const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
    const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
		const [isDepartureOpen, setIsDepartureOpen] = useState(false);
		const [isReturnOpen, setIsReturnOpen] = useState(false);
		const [tripType, setTripType] = useState('round-trip')
    const fromCity = search.from;
    const toCity = search.to;
    const passengerCount = search.passengers;
		const isOneWay = tripType === 'one-way';

	const cities: string[] = [
		'New Delhi - NDLS',
		'Lucknow - LJN'
	];
	
	const formatDate = (date: Date | undefined) => {
		if (!date) return "";
		return date.toLocaleDateString("ru-RU", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		});
	};

	let className: string = '';
	if (isMain) {
		className = 'dark';
	} 
    useEffect(() => {
        if (search.depart) setDepartureDate(new Date(search.depart));
        else setDepartureDate(undefined);
        if (search.ret) setReturnDate(new Date(search.ret));
        else setReturnDate(undefined);
    }, [search.depart, search.ret]);

		useEffect(() => {
			if(tripType === 'one-way') {
				setReturnDate(undefined);
				dispatch(setReturn(null))
			}
		}, [tripType, dispatch])

    const searchHref = useMemo(() => {
        const query = buildSearchQuery({
            from: fromCity,
            to: toCity,
            depart: departureDate ? departureDate.toISOString().slice(0, 10) : null,
            ret: returnDate ? returnDate.toISOString().slice(0, 10) : null,
            passengers: passengerCount,
        });
        return `/trains${query}`;
    }, [fromCity, toCity, departureDate, returnDate, passengerCount])


	return (
		<div className={`ticket-search-form ${className}`}>
			<div className='ticket-search-form__item'>
			<div className='ticket-search-form__trip-type'>
				<div className='ticket-search-form__item-radio'>
					<input type="radio" name="trip-type" id="round-trip" checked={tripType === 'round-trip'} onChange={() => setTripType('round-trip')} />
					<label htmlFor="round-trip">
						<span>Round trip</span>
					</label>
				</div>
				<div className='ticket-search-form__item-radio'>
					<input type="radio" name="trip-type" id="one-way" checked={tripType === 'one-way'} onChange={() => setTripType('one-way')} />
					<label htmlFor="one-way">
						<span>One way</span>
					</label>
				</div>
			</div>
            <div className='ticket-search-form__item-person'>
                <img src={person} alt="person" />
                <button
                    className='ticket-search-form__button-minus'
                    onClick={() => dispatch(setPassengers(Math.max(1, passengerCount - 1)))}
                    disabled={passengerCount === 1}
                >-</button>
                <span className='ticket-search-form__count'>{passengerCount}</span>
                <button
                    className='ticket-search-form__button-plus'
                    onClick={() => dispatch(setPassengers(Math.min(4, passengerCount + 1)))}
                    disabled={passengerCount >= 4}
                >+</button>
            </div>
		</div>
			<div className={`ticket-search-form__departure`}>
				<span>Departure</span>
                <select value={fromCity} onChange={(e) => dispatch(setFrom(e.target.value))} className={!fromCity ? 'select-placeholder' : ''}>
					<option value="" disabled>Select city/station</option>
					{cities.map((city) => (
						<option key={city} value={city}>{city}</option>
					))}
				</select>
			</div>
			<div className='ticket-search-form__arrival'>
				Arrival
                <select value={toCity} onChange={(e) => dispatch(setTo(e.target.value))} className={!toCity ? 'select-placeholder' : ''}>
					<option value="" disabled>Where to?</option>
					{cities.map((city) => (
						<option key={city} value={city}>{city}</option>
					))}
				</select>
			</div>
			<div className='ticket-search-form__depart-day'>
				Pick your lucky day
				<Popover open={isDepartureOpen} onOpenChange={setIsDepartureOpen}>
					<PopoverTrigger asChild>
						<div className="relative">
							<input 
								type="text" 
								placeholder="Depart" 
								value={formatDate(departureDate)}
								readOnly
								className="pr-10 cursor-pointer"
								onClick={() => setIsDepartureOpen(true)}
							/>

						</div>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							selected={departureDate}
                            onSelect={(date: Date | undefined) => {
																if (!date) return;
                                setDepartureDate(date);
																const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0'); 
                                const day = String(date.getDate()).padStart(2, '0');
                                
																const localDateString = `${year}-${month}-${day}`;
																dispatch(setDepart(localDateString));
                                setIsDepartureOpen(false);
                            }}
							disabled={(date) => {
								const today = new Date();
								today.setHours(0, 0, 0, 0);
								return date < today;
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className='ticket-search-form__return-day'>
				Return
				<Popover open={!isOneWay && isReturnOpen} onOpenChange={setIsReturnOpen}>
					<PopoverTrigger asChild disabled={isOneWay}>
						<div className="relative">
							<input 
								type="text" 
								placeholder="Return" 
								value={formatDate(returnDate)}
								readOnly
								disabled={isOneWay}
								className="pr-10 cursor-pointer"
								onClick={() => setIsReturnOpen(true)}
							/>
							
						</div>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							selected={returnDate}
                            onSelect={(date: Date | undefined) => {
                                setReturnDate(date);
																if (!date) return;
																const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0'); 
                                const day = String(date.getDate()).padStart(2, '0');
                                
																const localDateString = `${year}-${month}-${day}`;
																dispatch(setReturn(localDateString));

                                setIsReturnOpen(false);
                            }}
							disabled={(date) => {
								const today = new Date();
								today.setHours(0, 0, 0, 0);
								if (date < today) return true;
								if (departureDate && date < departureDate) return true;
								return false;
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
		<Button className='ticket-search-form__button' text='Ticket, Please!' href={searchHref} />

		</div>
	)
}

export default TicketSearchForm;