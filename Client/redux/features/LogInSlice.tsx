import { createSlice } from '@reduxjs/toolkit';

export const logInSlice = createSlice({
  name: 'LoginUser',
  initialState: {},
  reducers: {
    setLoginUser: (state, action) => {
      return {
        ...state,
        firstName: action.payload.firstName,
        email: action.payload.email,
        roll: action.payload.roll,
      };
    },
  },
});

export const { setLoginUser } = logInSlice.actions;
export default logInSlice.reducer;
