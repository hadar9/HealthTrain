import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { eraseFoodDiaryData } from './FoodDiaryReducer';
import { eraseWorkoutData } from './workoutReducer';
import { eraseUserData } from './UserDataReducer';
const initialState = {
  user: null,
  token: null,
  nutrition: null,
  calories: null,
  caloriesSum: null,
  foodItems: [],
};

export const fetchAllFoodItems = createAsyncThunk(
  'fetchAllFoodItemsStatus',
  async () => {
    const response = await axios.get('api/foodItem/getAllFoodItems');
    return { foodItems: response.data };
  }
);

const extraReducers = (builder) => {
  // Add reducers for additional action types here, and handle loading state as needed
  builder.addCase(fetchAllFoodItems.fulfilled, (state, action) => {
    // Add user to the state array
    state.foodItems = action.payload.foodItems;
  });
};

const reducers = {
  setUser: (state, action) => {
    state.user = jwt_decode(action.payload.user);
    return state;
  },
  logout: (state) => {
    localStorage.removeItem('persist:root');
    state = {
      user: null,
      token: null,
      nutrition: null,
      calories: null,
      caloriesSum: null,
      foodItems: [],
    };
    eraseFoodDiaryData();
    eraseWorkoutData();
    eraseUserData();
    return state;
  },
  setToken: (state, action) => {
    state.token = action.payload.token;
    return state;
  },
  setNutrition: (state, action) => {
    state.nutrition = action.payload.nutrition;
    if (action.payload.calories) {
      state.calories = action.payload.calories;
    }
    return state;
  },
  setCaloriesSum: (state, action) => {
    state.caloriesSum = action.payload.caloriesSum;
    return state;
  },
  updateFood: (state, { payload }) => {
    const { newItem, indexes } = payload;
    const [mealIndex, foodItemsIndex] = indexes;
    state.nutrition.meals[mealIndex].foodItems[foodItemsIndex] = newItem;
    return state;
  },
  deleteFood: (state, { payload }) => {
    const { indexes } = payload;
    const [mealIndex, foodItemsIndex] = indexes;
    state.nutrition.meals[mealIndex].foodItems.splice(foodItemsIndex, 1);
    return state;
  },
  updateMeal: (state, { payload }) => {
    const { newItem, mealIndex } = payload;
    state.nutrition.meals[mealIndex].foodItems.push(newItem);
    return state;
  },
};

export const userSlice = createSlice({
  name: 'userReducer',
  initialState: initialState,
  reducers: reducers,
  extraReducers,
});

// Action creators are generated for each case reducer function
export const {
  deleteFood,
  logout,
  setCaloriesSum,
  setNutrition,
  setToken,
  setUser,
  updateFood,
  updateMeal,
} = userSlice.actions;

export default userSlice.reducer;
