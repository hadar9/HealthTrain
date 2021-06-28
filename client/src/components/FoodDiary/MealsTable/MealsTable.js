import * as React from 'react';
import { useSelector } from 'react-redux';
import {MealTable} from './MealTable/MealTable';


export const MealsTable = () => {
  const foodDiary = useSelector(state => state.foodDiary)


 const mealsMap = foodDiary.nutrition ? foodDiary.nutrition.meals.map((m, index)=><MealTable key={index} meal={m} mealIndex={index} />) : null  

  return (
    <>
      {mealsMap}
    </>
  );
}

