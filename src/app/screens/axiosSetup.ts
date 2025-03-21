// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { useEffect } from 'react';
// import * as SecureStore from 'expo-secure-store'; 
//  // here is the Axiios request interceptor to add token to my requests
//   useEffect(() => {
//     const requestInterceptor = axios.interceptors.request.use(
//       (config) => {
//         const setAuthHeader = async () => {
//           try {
//             const storedToken = await SecureStore.getItemAsync('authToken');
//             if (storedToken && config.headers) {
//               config.headers.Authorization = `Bearer ${storedToken}`;
//             }
//           } catch (error) {
//             console.error('Error setting auth header:', error);
//           }
//         };

//         setAuthHeader().catch((error) => {
//           console.error('Error setting auth header:', error);
//         });

//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     return () => {
//       axios.interceptors.request.eject(requestInterceptor);
//     };
//   }, []);