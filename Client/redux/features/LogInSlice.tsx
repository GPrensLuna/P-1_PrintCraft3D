// src/redux/features/LogInSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '@/Ts/Login';

const initialState: UserState = {};

export const logInSlice = createSlice({
  name: 'LoginUser',
  initialState,
  reducers: {
    setLoginUser: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setLoginUser } = logInSlice.actions;
export default logInSlice.reducer;
