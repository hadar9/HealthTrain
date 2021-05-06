import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workout: null,
};

const reducers = {
  getWorkOuts: (state, action) => {
    state.workout = action.payload;
    return state;
  },
};

export const workoutSlice = createSlice({
  name: 'workoutReducer',
  initialState: initialState,
  reducers: reducers,
});

export const { getWorkOuts } = workoutSlice.actions;

export default workoutSlice.reducer;
