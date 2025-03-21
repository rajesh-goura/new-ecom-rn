import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { login , googleLogin} from '../redux/slices/authSlice';
import { facebookLogin } from '../redux/slices/authSlice';


const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { token, status, error } = useAppSelector((state) => state.auth);
  const theme = useAppSelector((state) => state.theme.theme);

  const handleSignIn = async () => {
    dispatch(login({ username, password }));
  };

  const handleGoogleSignIn = async () => {
    dispatch(googleLogin());
  };

  const handleFacebookSignIn = async () => {
    dispatch(facebookLogin());
  };
  

  return (
    <View style={[styles.mainContainer, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.signInText, theme === 'dark' ? styles.darkText : styles.lightText]}>Sign in</Text>

      <View style={styles.emailBox}>
        <TextInput
          placeholder='Username'
          style={[styles.emailInput, theme === 'dark' ? styles.darkInput : styles.lightInput]}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor={theme === 'dark' ? styles.darkPlaceholder.color : styles.lightPlaceholder.color}
        />
        <TextInput
          placeholder='Password'
          style={[styles.emailInput, theme === 'dark' ? styles.darkInput : styles.lightInput]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor={theme === 'dark' ? styles.darkPlaceholder.color : styles.lightPlaceholder.color}
        />
        <TouchableOpacity style={styles.signInBtn} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <Text style={[styles.createAccText, theme === 'dark' ? styles.darkText : styles.lightText]}>
          Don't have an Account?{' '}
          <Text style={[styles.createAccBold, theme === 'dark' ? styles.darkText : styles.lightText]}>Create One</Text>
        </Text>
      </View>

      <View style={styles.signInOptions}>
        <TouchableOpacity style={[styles.signInBtns, theme === 'dark' ? styles.darkSignInBtns : styles.lightSignInBtns]}>
          <Image source={require('../assets/Apple svg.png')} style={styles.icon} />
          <Text style={[styles.signInbuttonText, theme === 'dark' ? styles.darkSignInbuttonText : styles.lightSignInbuttonText]}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoogleSignIn} style={[styles.signInBtns, theme === 'dark' ? styles.darkSignInBtns : styles.lightSignInBtns]}>
          <Image source={require('../assets/Google - png 0.png')} style={styles.icon} />
          <Text style={[styles.signInbuttonText, theme === 'dark' ? styles.darkSignInbuttonText : styles.lightSignInbuttonText]}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFacebookSignIn} style={[styles.signInBtns, theme === 'dark' ? styles.darkSignInBtns : styles.lightSignInBtns]}>
          <Image source={require('../assets/Facebook - png 0.png')} style={styles.icon} />
          <Text style={[styles.signInbuttonText, theme === 'dark' ? styles.darkSignInbuttonText : styles.lightSignInbuttonText]}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 64,
    justifyContent: "center",
  },
  lightContainer: {
    backgroundColor: "#FFFFFF",
  },
  darkContainer: {
    backgroundColor: "#272727",
  },
  signInText: {
    fontWeight: "700",
    fontSize: 32,
    lineHeight: 34.5,
    letterSpacing: -0.41,
    marginBottom: 40,
    textAlign: "left",
  },
  lightText: {
    color: "#272727",
  },
  darkText: {
    color: "#FFFFFF",
  },
  emailBox: {
    gap: 16,
    width: "100%",
  },
  emailInput: {
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    width: "100%",
    alignSelf: "stretch",
  },
  lightInput: {
    backgroundColor: "#F4F4F4",
    color: "black",
  },
  darkInput: {
    backgroundColor: "#3C3C3C",
    color: "white",
  },
  darkPlaceholder: {
    color: '#BBBBBB',
  },
  lightPlaceholder: {
    color: '#777777',
  },
  signInBtn: {
    backgroundColor: "#8E6CEF",
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  createAccText: {
    fontWeight: "400",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  createAccBold: {
    fontWeight: "700",
  },
  signInOptions: {
    marginTop: 24,
    gap: 12,
    width: "100%",
  },
  signInBtns: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 100,
    justifyContent: "center",
    width: "100%",
    alignSelf: "stretch",
  },
  lightSignInBtns: {
    backgroundColor: "#E0E0E0",
  },
  darkSignInBtns: {
    backgroundColor: "#342F3F",
  },
  icon: {
    width: 20,
    height: 24,
  },
  signInbuttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  lightSignInbuttonText: {
    color: "black",
  },
  darkSignInbuttonText: {
    color: "white",
  },
});