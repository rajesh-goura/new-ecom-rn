import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { getApp } from '@react-native-firebase/app';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

GoogleSignin.configure({
  webClientId: '346919503837-g0kfs2cd9g4gkk7p8ndc9f6991btu978.apps.googleusercontent.com', 
});

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }) => {
    const response: any = await axios.post(
      'https://dummyjson.com/auth/login',
      credentials
    );
    const token = response.data.accessToken;
    return token;
  }
);

export const googleLogin = createAsyncThunk('auth/googleLogin', async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo: any = await GoogleSignin.signIn();
    console.log(userInfo);
    const token = userInfo.data.idToken; 

    return token;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('User canceled sign-in');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Sign-in is in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Play services not available');
    } else {
      throw new Error('Google sign-in failed');
    }
  }
});

export const facebookLogin = createAsyncThunk(
  'auth/facebookLogin',
  async (_, { rejectWithValue }) => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      const userCredential = await auth().signInWithCredential(facebookCredential);

      
      const user = {
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
        providerId: userCredential.user.providerId,
      };

      return user; 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await GoogleSignin.signOut();
    return null;
  } catch (error) {
    throw new Error('Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(googleLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Google login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      })
      .addCase(facebookLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(facebookLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.uid;  
      })
      
      .addCase(facebookLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;









