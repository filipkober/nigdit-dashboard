import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import User from '../models/User';

// typ danych
export interface UserState {
  user: User;
  count: number;
}

// Initial state
const initialState: UserState = {
  user: {
    username: '',
    email: '',
  },
  count: 0,
};

// funkcje ustawiające dane
export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    incrementCounter(state) {
        state.count += 1;
    }
  },
});

// eksporty
export const {
  setUser,
  incrementCounter
} = userSlice.actions;

export default userSlice.reducer;