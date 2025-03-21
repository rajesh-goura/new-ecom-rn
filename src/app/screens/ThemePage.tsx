import React from 'react';
import { View, Button, StyleSheet, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { toggleTheme, setDeviceTheme } from '../redux/slices/themeSlice';
import { logout } from '../redux/slices/authSlice';

const ThemePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const deviceTheme = useColorScheme();

  const handleSetDeviceTheme = () => {
    if (deviceTheme === 'light' || deviceTheme === 'dark') {
      dispatch(setDeviceTheme(deviceTheme));
    }
  };

  return (
    <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
      <Button title="Toggle Theme" onPress={() => dispatch(toggleTheme())} />
      <Button title="Set Device Theme" onPress={handleSetDeviceTheme} />
      <Button title='Logout' onPress={() => dispatch(logout())}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  light: {
    backgroundColor: '#ffffff',
  },
  dark: {
    backgroundColor: '#000000',
  },
});

export default ThemePage;