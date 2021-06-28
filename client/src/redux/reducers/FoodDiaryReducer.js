import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import moment from 'moment';


const initialState = {
  date: moment().format('yyyy-MM-DD'),
  nutrition: null,
  calories: null,
  caloriesSum: null,
  foodItems: []
};

export const fetchAllFoodItems = createAsyncThunk(
  'fetchAllFoodItemsStatus',
  async () => {
    const response = await axios.get('api/foodItem/getAllFoodItems')
    return {foodItems: response.data}
  }
)

const extraReducers = (builder) => {
  // Add reducers for additional action types here, and handle loading state as needed
  builder.addCase(fetchAllFoodItems.fulfilled, (state, action) => {
    // Add user to the state array
    state.foodItems = action.payload.foodItems
  })
}

const reducers = {
  setNutrition: (state, {payload}) => {
    state.nutrition = payload.nutrition;
    if(payload.calories){
      state.calories = payload.calories;
    }
    return state;
  },
  setDate: (state, {payload}) => {
    state = {
      ...state,
      date: moment(payload.date).format('yyyy-MM-DD'),
      nutrition: null,
      calories: null,
      caloriesSum: null,
    }
    // state.date = moment(payload.date).format('yyyy-MM-DD');
    return state;
  },
  eraseFoodDiaryData: (state, {payload}) => {
    state = {
      date:null,
      nutrition: null,
      calories: null,
      caloriesSum: null,
      foodItems: null
    }
    return state;
  },
  setFoodItems: (state, {payload}) => {
    state.foodItems = payload.foodItems;
    return state;
  },
  setCaloriesSum: (state, {payload}) => {
    state.caloriesSum = payload.caloriesSum;
    return state;
  },
  updateFood: (state, {payload}) => {
    const {newItem, indexes} = payload
    const [mealIndex, foodItemsIndex] = indexes
    state.nutrition.meals[mealIndex].foodItems[foodItemsIndex] = newItem
    return state;
  },

  deleteFood: (state, {payload}) => {
    const {indexes} = payload
    const [mealIndex, foodItemsIndex] = indexes
    state.nutrition.meals[mealIndex].foodItems.splice(foodItemsIndex, 1)
    return state;
  },
  updateMeal: (state, {payload}) => {
    const {newItem, mealIndex} = payload
    state.nutrition.meals[mealIndex] = newItem
    return state;
  },
  updateNutritionMeals: (state, {payload}) => {
    const {newItem} = payload
    state.nutrition.meals = newItem
    return state;
  },

}


export const foodDiarySlice = createSlice({
    name: 'foodDiaryReducer',
    initialState: initialState,
    reducers: reducers,
    extraReducers
  })
  
  // Action creators are generated for each case reducer function
  export const {updateNutritionMeals, eraseFoodDiaryData, deleteFood, setDate, setCaloriesSum, setNutrition,  updateFood, updateMeal } = foodDiarySlice.actions
  
  export default foodDiarySlice.reducer