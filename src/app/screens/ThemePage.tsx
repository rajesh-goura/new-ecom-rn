import React, { useCallback, useState } from 'react';
import { 
  View, Button, StyleSheet, useColorScheme, Alert, Text 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { toggleTheme, setDeviceTheme } from '../redux/slices/themeSlice';
import { logout } from '../redux/slices/authSlice';
import api from '../crashlytics/axiosInstance'; 
import { triggerTestCrash } from '../crashlytics/crashlyticsLogger'; 
import { triggerTestCrasher } from '../crashlytics/triggerCrash';
import { getCrashlytics } from '@react-native-firebase/crashlytics';
import * as Linking from 'expo-linking';

const supportedURL = 'https://google.com';

type OpenURLButtonProps = {
  url: string;
  children: string;
};

const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const OpenSettingsButton = ({ children }: { children: string }) => {
  const handlePress = useCallback(async () => {
    await Linking.openSettings();
  }, []);

  return <Button title={children} onPress={handlePress} />;
};

const ThemePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const deviceTheme = useColorScheme();
  const [response, setResponse] = useState<string>('');

  const handleSetDeviceTheme = () => {
    if (deviceTheme === 'light' || deviceTheme === 'dark') {
      dispatch(setDeviceTheme(deviceTheme));
    }
  };


  const crashlytics = getCrashlytics();
  const fetchData = async () => {
    try {
      const res = await api.get('https://dummyjson.com/productsw'); 
      setResponse(JSON.stringify(res.data));
    } catch (error) {
      setResponse('API request failed. Check Crashlytics for details.');
      crashlytics.log('API Erequest failed');
    }
  };

  return (
    <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
      <Button title="Toggle Theme" onPress={() => dispatch(toggleTheme())} />
      <Button title="Set Device Theme" onPress={handleSetDeviceTheme} />
      <Button title="Logout" onPress={() => dispatch(logout())} />
      <OpenSettingsButton>Open Settings</OpenSettingsButton>
      <OpenURLButton url={supportedURL}>Open Google</OpenURLButton>
      
      
      <Button title="Fetch Data (API Test)" onPress={fetchData} />

      
      <Button title="Trigger Crash (Test)" onPress={triggerTestCrash} />

     
      {response ? <Text style={styles.responseText}>{response}</Text> : null}

      <View style={styles.container}>
            <Button title="Open a URL" onPress={() => Linking.openURL('https://expo.dev/')} />
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  light: {
    backgroundColor: '#ffffff',
  },
  dark: {
    backgroundColor: '#000000',
  },
  responseText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'red',
  },
});

export default ThemePage;








