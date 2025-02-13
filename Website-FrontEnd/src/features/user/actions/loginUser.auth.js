import { createAsyncThunk } from "@reduxjs/toolkit";
import loginUserCheck from "../../../api/authentication/loginUser.api";
import {validateAccessToken} from "../../../api/authentication/validateAccessToken.api";


export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ username, password }) => {
      const result = await loginUserCheck(username, password);
      if (result.error) throw new Error(result.error);
      await validateAccessToken(result.tokens.access);
      localStorage.setItem('token', result.tokens.access);
      localStorage.setItem('refreshToken',result.tokens.refresh)
      localStorage.setItem('userData', JSON.stringify(result.user));
      return { token: result.tokens.access, user: result.user };
    }
  );