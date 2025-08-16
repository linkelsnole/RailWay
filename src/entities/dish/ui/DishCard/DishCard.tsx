import React from 'react';
import type { Dish } from '../../model/types';
import './DishCard.scss';

interface DishCardProps {
  dish: Dish;
  children?: React.ReactNode; 
}

export function DishCard({ dish, children }: DishCardProps) {
  return (
    <div className="dish-card">
      <div className="dish-card__image">
        <img src={dish.image} alt={dish.title} />
      </div>
      <div className="dish-card__content">
        <h3 className="dish-card__title">{dish.title}</h3>
        <p className="dish-card__price">{dish.price}</p>
        {children && (
          <div className="dish-card__action">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
