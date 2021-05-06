// import { createReducer, createAction, createSlice } from "@reduxjs/toolkit";
// import jwt_decode from "jwt-decode";

// // export const setUser = createAction("setUser");
// // export const logout = createAction("logout");
// // export const setToken = createAction("setToken");
// // export const setNutrition = createAction("setNutrition");
// // export const setCaloriesSum = createAction("setCaloriesSum");
// // export const updateFood = createAction("updateFood");
// // export const deleteFood = createAction("deleteFood");
// // export const updateMeal = createAction("updateMeal");




// const initialState = {
//   user: null,
//   token: null,
//   nutrition : null,
//   calories : null,
//   caloriesSum: null
// };

// // export const UserReducer = createReducer(initialState, {
// //   [setUser]: (state, action) => {
// //     state.user = jwt_decode(action.payload.user);
// //     return state;
// //   },
// //   [logout]: (state) => {
// //     localStorage.removeItem("persist:root");
// //     state = {
// //       user: null,
// //       token: null,
// //     };
// //     return state;
// //   },
// //   [setToken]: (state, action) => {
// //     state.token = action.payload.token;
// //     return state;
// //   },
// //   [setNutrition]: (state, action) => {
// //     state.nutrition = action.payload.nutrition;
// //     if(action.payload.calories){
// //       state.calories = action.payload.calories;
// //     }
// //     return state;
// //   },
// //   [setCaloriesSum]: (state, action) => {
// //     state.caloriesSum = action.payload.caloriesSum;
// //     return state;
// //   },
// //   [updateFood]: (state, {payload}) => {
// //     const {newItem, indexes} = payload
// //     const [mealIndex, foodItemsIndex] = indexes
// //     state.nutrition.meals[mealIndex].foodItems[foodItemsIndex] = newItem
// //     return state;
// //   },
// //   [deleteFood]: (state, {payload}) => {
// //     const {indexes} = payload
// //     const [mealIndex, foodItemsIndex] = indexes
// //     state.nutrition.meals[mealIndex].foodItems.splice(foodItemsIndex, 1)
// //     return state;
// //   },
// //   [updateMeal]: (state, {payload}) => {
// //     const {newItem, mealIndex} = payload
// //     state.nutrition.meals[mealIndex].push(newItem)
// //     return state;
// //   },
// // });

// const reducers = {
//   setUser: (state, action) => {
//     state.user = jwt_decode(action.payload.user);
//     return state;
//   },
//   logout: (state) => {
//     localStorage.removeItem("persist:root");
//     state = {
//       user: null,
//       token: null,
//     };
//     return state;
//   },
//   setToken: (state, action) => {
//     state.token = action.payload.token;
//     return state;
//   },
//   setNutrition: (state, action) => {
//     state.nutrition = action.payload.nutrition;
//     if(action.payload.calories){
//       state.calories = action.payload.calories;
//     }
//     return state;
//   },
//   setCaloriesSum: (state, action) => {
//     state.caloriesSum = action.payload.caloriesSum;
//     return state;
//   },
//   updateFood: (state, {payload}) => {
//     const {newItem, indexes} = payload
//     const [mealIndex, foodItemsIndex] = indexes
//     state.nutrition.meals[mealIndex].foodItems[foodItemsIndex] = newItem
//     return state;
//   },
//   deleteFood: (state, {payload}) => {
//     const {indexes} = payload
//     const [mealIndex, foodItemsIndex] = indexes
//     state.nutrition.meals[mealIndex].foodItems.splice(foodItemsIndex, 1)
//     return state;
//   },
//   updateMeal: (state, {payload}) => {
//     const {newItem, mealIndex} = payload
//     state.nutrition.meals[mealIndex].push(newItem)
//     return state;
//   }
// }


// export const userSlice = createSlice({
//   name: 'userReducer',
//   initialState: initialState,
//   reducers: reducers
// })

// // Action creators are generated for each case reducer function
// export const {deleteFood, logout, setCaloriesSum, setNutrition, setToken, setUser, updateFood, updateMeal } = userSlice.actions

// export default userSlice.reducer


// const persisteduserReducer = persistReducer(persistConfig, userSlice)
// // const persistedReducers = persistReducer(persistConfig, userSlice)

// export const rootReducer = {userReducer: persisteduserReducer};


// export default rootReducer;
