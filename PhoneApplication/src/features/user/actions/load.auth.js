import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateAccessToken, generateRefreshToken} from '../../../api/authentication/validateAccessToken.api';

export const loadAuth = createAsyncThunk(
    'auth/load',
    async () => {
        try {
            // First try to get the stored token
            let currentToken = await AsyncStorage.getItem('token');
            
            // If no token exists or token validation fails, try refresh token
            if (!currentToken) {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if (!refreshToken) {
                    return null;
                }
                
                const refreshResponse = await generateRefreshToken(refreshToken);
                if (!refreshResponse?.['new-access']) {
                    return null;
                }
                
                // Update current token with new one
                currentToken = refreshResponse['new-access'];
                await AsyncStorage.setItem('token', currentToken);
            }

            // Validate the token (either existing or newly refreshed)
            const validationResponse = await validateAccessToken(currentToken);
            if (validationResponse?.status === 'success' && validationResponse?.user) {
                return {
                    token: currentToken,
                    user: validationResponse.user
                };
            }

            // If validation fails, clear storage and return null
            await AsyncStorage.multiRemove(['token', 'refreshToken']);
            return null;

        } catch (error) {
            console.error('Auth loading error:', error);
            return null;
        }
    }
);