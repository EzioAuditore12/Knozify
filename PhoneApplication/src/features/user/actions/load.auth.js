import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validateAccessToken from '../../../api/authentication/validateAccessToken.api';

export const loadAuth = createAsyncThunk(
    'auth/load',
    async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) return null;
      
      const response = await validateAccessToken(storedToken);
      if (response?.status === 'success' && response?.user) {
        return { token: storedToken, user: response.user };
      }
      return null;
    }
  );