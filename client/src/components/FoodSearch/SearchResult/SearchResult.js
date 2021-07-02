import React from "react";
import { Typography } from "@material-ui/core";
import { SaveSearchFoodItem } from "./SaveSearchFoodItem/SaveSearchFoodItem";

export const SearchResult = ({ resultItem, setMsg, setLoading }) => {
  const calcFoodType = () => {
    const totalProtein = resultItem.protein_g;
    const totalCarbs = resultItem.carbohydrates_total_g;
    const totalFat = resultItem.fat_total_g;

    if (totalProtein > totalCarbs && totalProtein > totalFat) return "Protein";
    if (totalCarbs > totalProtein && totalCarbs > totalFat) return "Carbs";
    if (totalFat > totalCarbs && totalFat > totalProtein) return "Fat";
  };

  return (
    <div align="center">
      <hr />
      <Typography>Name: {resultItem.name}</Typography>
      <Typography>Calories: {resultItem.calories}</Typography>
      <Typography>Default Amount: {resultItem.serving_size_g}g</Typography>
      <Typography>Food Type: {calcFoodType()}</Typography>
      <hr />
      <SaveSearchFoodItem
        setLoading={setLoading}
        amountType={"Grams"}
        foodType={calcFoodType()}
        setMsg={setMsg}
        resultItem={resultItem}
      />
    </div>
  );
};
