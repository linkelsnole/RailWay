import { DishCard } from '../../../entities/dish/ui/DishCard/DishCard';
import { AddToTicketButton } from '../../../features/add-to-ticket/ui/AddToTicketButton';
import type { Dish } from '../../../entities/dish/model/types';
import dishes1 from '../../../shared/images/dishes-cards/dishes-1.svg';
import dishes2 from '../../../shared/images/dishes-cards/dishes-2.svg';
import dishes3 from '../../../shared/images/dishes-cards/dishes-3.svg';
import './MenuHighlights.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addDishByText, removeDish } from '@/entities/bill/model/billSlice';

export function MenuHighlights() {
	const dispatch = useAppDispatch();
	const addedDishes = useAppSelector((state) => state.bill.dishes)


  const dishes: Dish[] = [
    {id: '1', title: 'Paneer Tikka Rice Bowl - Mini', price: '$200.00',image: dishes1 },
    { id: '2', title: 'Grilled Tandoori Chicken With Dry Fruits', price: '$500.00', image: dishes2},
    {id: '3',title: 'Aloo Paratha Curd Meal (2 Pcs)',price: '$120.00',image: dishes3}
  ];

  const handleToggleTicket = (dish: Dish, isAdded: boolean) => {
		if (isAdded) {
			dispatch(removeDish({id: dish.id}));
		} else {
    dispatch(addDishByText({
      id: dish.id,
      title: dish.title,
      priceText: dish.price,
    }))
  }
}

  return (
    <div className="menu-highlights">
      <div className="menu-highlights__grid">
			{dishes.map((dish) => {
          const isAdded = addedDishes.some(addedDish => addedDish.id === dish.id);

          return (
            <DishCard key={dish.id} dish={dish}>
              <AddToTicketButton 
                isAdded={isAdded}
                onClick={() => handleToggleTicket(dish, isAdded)}
              />
            </DishCard>
          );
        })}
      </div>
      <div className="menu-highlights__view-more">
        <button className="menu-highlights__view-more-button">
          View More →
        </button>
      </div>
    </div>
  );
}

