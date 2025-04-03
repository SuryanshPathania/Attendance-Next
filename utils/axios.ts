import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Ensure cookies are sent with requests
});

export default API;



// // utils/axios.ts
// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add authentication interceptor
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor for handling common errors
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle 401 Unauthorized errors
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('token');
      
//       // Redirect to login page if not already there
//       if (window.location.pathname !== '/login') {
//         window.location.href = '/login';
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default API;