import { View, Text, StyleSheet, Image, Button } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchUserDetails, clearUserDetails } from '../redux/slices/usersSlice';
import { logout } from '../redux/slices/authSlice';

const UserDetails = () => {
  
  
  // const { userDetails, status, error } = useAppSelector((state) => state.user);
  // const theme = useAppSelector((state) => state.theme.theme);

  // useEffect(() => {
  //   dispatch(fetchUserDetails());

  //   return () => {
  //     dispatch(clearUserDetails());
  //   };
  // }, [dispatch]);

  // if (status === 'loading') {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text style={[styles.loadingText, theme === 'dark' ? styles.darkText : styles.lightText]}>Loading...</Text>
  //     </View>
  //   );
  // }

  // if (status === 'failed') {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text style={[styles.loadingText, theme === 'dark' ? styles.darkText : styles.lightText]}>Error: {error}</Text>
  //     </View>
  //   );
  // }

  // if (!userDetails) {
  //   return null;
  // }

  // <View style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
  //     <Image source={{ uri: userDetails.image }} style={styles.profileImage} />
  //     <Text style={[styles.name, theme === 'dark' ? styles.darkText : styles.lightText]}>{userDetails.name}</Text>
  //     <Text style={[styles.username, theme === 'dark' ? styles.darkText : styles.lightText]}>@{userDetails.username}</Text>
  //     <Text style={[styles.email, theme === 'dark' ? styles.darkText : styles.lightText]}>{userDetails.email}</Text>
  //     <Text style={[styles.phone, theme === 'dark' ? styles.darkText : styles.lightText]}>{userDetails.phone}</Text>
  //     <Text style={[styles.address, theme === 'dark' ? styles.darkText : styles.lightText]}>{userDetails.address.address}</Text>
  //     <Button title='Logout' onPress={() => dispatch(logout())}></Button>
  //   </View>

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
  },
  username: {
    fontSize: 18,
    fontWeight: '500',
  },
  email: {
    fontSize: 16,
    marginTop: 8,
  },
  phone: {
    fontSize: 16,
    marginTop: 8,
  },
  address: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  lightText: {
    color: '#272727',
  },
  darkText: {
    color: '#FFFFFF',
  },
});