// tokenUtils.js

import axios from 'axios';

export const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('Refresh token is missing.');
      }
      console.log('--refreshtoken---', refreshToken )
      const backend_host = process.env.REACT_APP_BACKEND_HOST;
      const response = await axios.post(`${backend_host}/api/token/refresh/`, {
        refresh: refreshToken
      });
      const newAccessToken = response.data.access_token;
      localStorage.setItem('token', newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  };
  
