import { createReducer, createAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const setUser = createAction("setUser");
export const logout = createAction("logout");
export const setToken = createAction("setToken");
export const setNutrition = createAction("setNutrition");
export const setCaloriesSum = createAction("setCaloriesSum");
export const updateFood = createAction("updateFood");




const initialState = {
  user: null,
  token: null,
  nutrition : null,
  calories : null,
  caloriesSum: null
};

export const UserReducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    state.user = jwt_decode(action.payload.user);
    return state;
  },
  [logout]: (state) => {
    localStorage.removeItem("persist:root");
    state = {
      user: null,
      token: null,
    };
    return state;
  },
  [setToken]: (state, action) => {
    state.token = action.payload.token;
    return state;
  },
  [setNutrition]: (state, action) => {
    state.nutrition = action.payload.nutrition;
    if(action.payload.calories){
      state.calories = action.payload.calories;
    }
    return state;
  },
  [setCaloriesSum]: (state, action) => {
    state.caloriesSum = action.payload.caloriesSum;
    return state;
  },
  [updateFood]: (state, {payload}) => {
    const {newItem, indexes} = payload
    const [mealIndex, foodItemsIndex] = indexes
    state.nutrition.meals[mealIndex].foodItems[foodItemsIndex] = newItem
    return state;
  },


});
