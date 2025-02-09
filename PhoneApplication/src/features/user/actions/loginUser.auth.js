import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginUserCheck from "../../../api/loginUser.api";
import validateAccessToken from "../../../api/validateAccessToken.api";


export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ username, password }) => {
      const result = await loginUserCheck(username, password);
      if (result.error) throw new Error(result.error);
      await validateAccessToken(result.tokens.access);
      await AsyncStorage.setItem('token', result.tokens.access);
      await AsyncStorage.setItem('userData', JSON.stringify(result.user));
      return { token: result.tokens.access, user: result.user };
    }
  );