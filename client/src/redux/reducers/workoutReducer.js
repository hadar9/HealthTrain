import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workout: null,
  loading: false,
};

const reducers = {
  getWorkOuts: (state, action) => {
    state.workout = action.payload;
    state.loading = true;
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
