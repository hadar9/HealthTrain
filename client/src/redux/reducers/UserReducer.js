import { createReducer, createAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const setUser = createAction("setUser");
export const logout = createAction("logout");
export const setToken = createAction("setToken");
export const setNutrition = createAction("setNutrition");




const initialState = {
  user: null,
  token: null,
  nutrition : null
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
    return state;
  },


});
