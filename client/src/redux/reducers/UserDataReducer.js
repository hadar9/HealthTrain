import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userdata: null,
};

const reducers = {
  getuserdata: (state, action) => {
    state.userdata = action.payload;
    return state;
  },
};

export const userdataSlice = createSlice({
  name: 'UserDataReducer',
  initialState: initialState,
  reducers: reducers,
});

export const { getuserdata } = userdataSlice.actions;

export default userdataSlice.reducer;
