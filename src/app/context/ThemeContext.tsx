// import React, { createContext, useContext, useState } from "react";
// import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

// // Define types for ThemeContext
// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// // Create a Context with default values
// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// // Provider Component
// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>(DefaultTheme);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === DefaultTheme ? DarkTheme : DefaultTheme));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// // Custom Hook for using ThemeContext
// export const useThemeContext = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useThemeContext must be used within a ThemeProvider");
//   }
//   return context;
// };


// import React, { createContext, useContext, useState } from "react";
// import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
// import { ColorSchemeName, useColorScheme } from 'react-native';


// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
//   setDeviceTheme: (scheme: ColorSchemeName) => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>(DefaultTheme);
//   const deviceTheme = useColorScheme();

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === DefaultTheme ? DarkTheme : DefaultTheme));
//   };

//   const setDeviceTheme = (scheme: ColorSchemeName) => {
//     setTheme(scheme === 'dark' ? DarkTheme : DefaultTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, setDeviceTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };


// export const useThemeContext = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useThemeContext must be used within a ThemeProvider");
//   }
//   return context;
// };
