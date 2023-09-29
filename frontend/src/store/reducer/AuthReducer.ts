import { createSlice, createAsyncThunk, ThunkAction } from '@reduxjs/toolkit';
import AuthService from '../../service/AuthService';
import { API_URL } from '../../http';
import axios from 'axios';
import { IUser } from '../../response/AuthResponse';

interface AuthState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
};

const api = axios.create({
  baseURL: API_URL,
});

export const login = createAsyncThunk('api/login', async (credentials: { email: string; password: string }) => {
    const response = await AuthService.login(credentials.email, credentials.password);
    localStorage.setItem('token', response.data.accessToken);
    return response.data.user;
  });
  
  export const registration = createAsyncThunk( 'api/registration', async (credentials: { email: string; password: string }) => {
    const response = await AuthService.registration(credentials.email, credentials.password);
    localStorage.setItem('token', response.data.accessToken);
    return response.data.user;
  });
  
  export const logout = createAsyncThunk('api/logout', async () => {
    await AuthService.logout();
    localStorage.removeItem('token');
    return {} as IUser;
  });

  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(login.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuth = true;
        })
        .addCase(registration.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuth = true;
        })
        .addCase(logout.fulfilled, (state, action) => {
          state.user = {} as IUser;
          state.isAuth = false;
        })
        .addMatcher(
          (action) => action.type.endsWith('/pending'),
          (state) => {
            state.isLoading = true;
          }
        )
        .addMatcher(
          (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
          (state) => {
            state.isLoading = false;
          }
        );
    },
  });

export default authSlice.reducer