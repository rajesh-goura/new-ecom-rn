import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Address {
  address: string;
}

interface UserDetails {
  image: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: Address;
}

interface UserState {
  userDetails: UserDetails | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  userDetails: null,
  status: 'idle',
  error: null,
};

export const fetchUserDetails = createAsyncThunk<UserDetails, void, { rejectValue: string }>(
  'user/fetchUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://dummyjson.com/auth/me');
      if (response.data && typeof response.data === 'object') {
        return response.data as UserDetails;
      } else {
        return rejectWithValue('Invalid data format');
      }
    } catch (error) {
      return rejectWithValue('Failed to fetch user details');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<UserDetails>) => {
        state.status = 'succeeded';
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch user details';
      });
  },
});

export const { clearUserDetails } = userSlice.actions;

export default userSlice.reducer;