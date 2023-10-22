import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import User, { UserVotes } from '../models/User';
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
    confirmed: false,
    email: '',
    votes: {
      upvotes: {
        posts: [],
        comments: [],
        replies: [],
      },
      downvotes: {
        posts: [],
        comments: [],
        replies: [],
      },
    },
    provider: '',
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
    setCurrentSubnigdit(state, action: PayloadAction<SubnigditN>) {
      state.currentSubnigdit = action.payload;
    },
    setUserVotes(state, action: {payload: UserVotes}) {
      state.user.votes = action.payload;
    },
    resetData(state) {
      state.user = {
        username: '',
        confirmed: false,
        email: '',
        votes: {
          upvotes: {
            posts: [],
            comments: [],
            replies: [],
          },
          downvotes: {
            posts: [],
            comments: [],
            replies: [],
          },
        },
        provider: '',
      };
      state.count = 0;
      state.currentSubnigdit = undefined;
    }
  },
});

// eksporty
export const {
  setUser,
  incrementCounter,
  setCurrentSubnigdit,
  setUserVotes,
  resetData
} = userSlice.actions;

export default userSlice.reducer;