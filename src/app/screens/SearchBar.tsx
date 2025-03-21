import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useAppSelector } from '../redux/hooks';

const SearchBar = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <View style={[styles.searchBar, theme === 'dark' ? styles.darkSearchBar : styles.lightSearchBar]}>
      <Image style={styles.searchIcon} source={require("../assets/icons/searchnormal1.png")} />
      <TextInput
        placeholder='Search'
        placeholderTextColor={theme === 'dark' ? styles.darkPlaceholder.color : styles.lightPlaceholder.color}
        style={[styles.searchInput, theme === 'dark' ? styles.darkText : styles.lightText]}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    width: 342,
    height: 40,
    borderRadius: 100,
    marginVertical: 24,
    paddingLeft: 19,
    paddingVertical: 11,
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  lightSearchBar: {
    backgroundColor: "#F4F4F4",
  },
  darkSearchBar: {
    backgroundColor: "#3C3C3C",
  },
  searchIcon: {
    width: 16,
    height: 16,
  },
  searchInput: {
    flex: 1,
  },
  lightText: {
    color: "#272727",
  },
  darkText: {
    color: "#FFFFFF",
  },
  lightPlaceholder: {
    color: "#777777",
  },
  darkPlaceholder: {
    color: "#BBBBBB",
  },
});