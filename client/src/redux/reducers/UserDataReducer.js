import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userdata: null,
};

const reducers = {
  getuserdata: (state, payload) => {
    state.userdata = payload.payload;
    return state;
  },
  eraseUserData: (state) => {
    state = {
      userdata: null,
    };
    return state;
  },
};

export const userdataSlice = createSlice({
  name: 'UserDataReducer',
  initialState: initialState,
  reducers: reducers,
});

export const { getuserdata, eraseUserData } = userdataSlice.actions;

export default userdataSlice.reducer;
