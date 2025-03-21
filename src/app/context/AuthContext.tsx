
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import * as SecureStore from 'expo-secure-store'; 


// interface AuthContextType {
//   login: (token: string) => Promise<void>;
//   logout: () => Promise<void>;
//   token: string | null;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     const loadToken = async () => {
//       try {
//         const storedToken = await SecureStore.getItemAsync('authToken');
//         if (storedToken) {
//           setToken(storedToken);
//         }
//       } catch (error) {
//         console.error('Error loading token:', error);
//       }
//     };
//     loadToken();
//   }, []);

 

 
//   const login = async (token: string) => {
//     try {
//       await SecureStore.setItemAsync('authToken', token, {
        
//       });
//       setToken(token);
//     } catch (error) {
//       console.error('Error saving token:', error);
//     }
//   };

  
//   const logout = async () => {
//     try {
//       await SecureStore.deleteItemAsync('authToken');
//       setToken(null);
//     } catch (error) {
//       console.error('Error removing token:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ login, logout, token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
