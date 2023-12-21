import { createSlice } from '@reduxjs/toolkit';
import User, { UserVotes } from '../models/User';

// typ danych
export interface UserState {
  user: User;
  count: number;
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
    }
  },
});

// eksporty
export const {
  setUser,
  incrementCounter,
  setUserVotes,
  resetData
} = userSlice.actions;

export default userSlice.reducer;