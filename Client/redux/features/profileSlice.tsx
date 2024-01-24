import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataProfile } from '@/Ts/Login';

// Define el estado inicial
const initialState = {
    profile: {}
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<DataProfile>) => {
            state.profile = action.payload;
        },
    },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
