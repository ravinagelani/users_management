// import axios from 'axios';


//   // =====> add in app.js
  
//   const refreshToken = async () => {
//     try {
//       const backend_host = process.env.REACT_APP_BACKEND_HOST;
//       const response = await axios.post(`${backend_host}/api/token/refresh/`, {
//         refresh: localStorage.getItem('refreshToken')
//       });
//       const newAccessToken = response.data.access;
//       localStorage.setItem('token', newAccessToken);
//       return newAccessToken;
//     } catch (error) {
//       console.error('Error refreshing token:', error);
//       throw error;
//     }
//   };

//   const handle401Error = async (error) => {
//     if (error.response.status === 401) {
//       try {
//         const newAccessToken = await refreshToken();
//         // Retry the failed request with the new access token
//         error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         return axios.request(error.config);
//       } catch (refreshError) {
//         console.error('Error refreshing token:', refreshError);
//         // If token refresh fails, log out the user
//         handleLogout();
//       }
//     } else {
//       throw error;
//     }
//   };

//   axios.interceptors.response.use(
//     response => response,
//     error => handle401Error(error)
//   );
