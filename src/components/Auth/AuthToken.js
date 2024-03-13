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

  // =====> add in app.js
  
  // const refreshToken = async () => {
  //   try {
  //     const response = await axios.post('http://192.168.1.20:8000/api/token/refresh/', {
  //       refresh: localStorage.getItem('refreshToken')
  //     });
  //     const newAccessToken = response.data.access;
  //     localStorage.setItem('token', newAccessToken);
  //     return newAccessToken;
  //   } catch (error) {
  //     console.error('Error refreshing token:', error);
  //     throw error;
  //   }
  // };

  // const handle401Error = async (error) => {
  //   if (error.response.status === 401) {
  //     try {
  //       const newAccessToken = await refreshToken();
  //       // Retry the failed request with the new access token
  //       error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
  //       return axios.request(error.config);
  //     } catch (refreshError) {
  //       console.error('Error refreshing token:', refreshError);
  //       // If token refresh fails, log out the user
  //       handleLogout();
  //     }
  //   } else {
  //     throw error;
  //   }
  // };

  // axios.interceptors.response.use(
  //   response => response,
  //   error => handle401Error(error)
  // );
