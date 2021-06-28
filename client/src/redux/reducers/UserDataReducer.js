import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userdata: null,
};

const reducers = {
  getuserdata: (state, {payload}) => {
    state.userdata = payload.userdata;
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
