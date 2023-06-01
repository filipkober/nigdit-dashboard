import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import User from '../models/User';
import { SubnigditN } from '../models/Subnigdit';

// typ danych
export interface UserState {
  user: User;
  count: number;
  currentSubnigdit?: SubnigditN;
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
    },
    setCurrentSubnigdit(state, action) {
      state.currentSubnigdit = action.payload;
    }
  },
});

// eksporty
export const {
  setUser,
  incrementCounter,
  setCurrentSubnigdit
} = userSlice.actions;

export default userSlice.reducer;