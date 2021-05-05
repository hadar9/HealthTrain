import { createReducer, createAction } from '@reduxjs/toolkit';

export const getWorkOuts = createAction('getWorkOuts');

const initialState = {
  workout: null,
};

export const workoutReducer = createReducer(initialState, {
  [getWorkOuts]: (state, action) => {
    state.workout = action.payload;
    return state;
  },
});
