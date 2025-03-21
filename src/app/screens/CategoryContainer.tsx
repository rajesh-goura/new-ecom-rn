import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useAppSelector } from '../redux/hooks';

const CategoryContainer = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryHeadingTexts}>
        <Text style={[styles.categoryHdBoldTxt, theme === 'dark' ? styles.darkText : styles.lightText]}>Categories</Text>
        <Text style={[styles.categoryHdtxt, theme === 'dark' ? styles.darkText : styles.lightText]}>See All</Text>
      </View>
      <View style={styles.categoryItemContainer}>
        <TouchableOpacity style={styles.categoryItemBox}>
          <Image source={require("../assets/products/Ellipse 1.png")} style={styles.categoryImg} />
          <Text style={[styles.categorynametxt, theme === 'dark' ? styles.darkText : styles.lightText]}>Hoodies</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItemBox}>
          <Image source={require("../assets/products/Ellipse 2.png")} style={styles.categoryImg} />
          <Text style={[styles.categorynametxt, theme === 'dark' ? styles.darkText : styles.lightText]}>Shorts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItemBox}>
          <Image source={require("../assets/products/Ellipse 3.png")} style={styles.categoryImg} />
          <Text style={[styles.categorynametxt, theme === 'dark' ? styles.darkText : styles.lightText]}>Shoes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItemBox}>
          <Image source={require("../assets/products/Ellipse 4.png")} style={styles.categoryImg} />
          <Text style={[styles.categorynametxt, theme === 'dark' ? styles.darkText : styles.lightText]}>Bag</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItemBox}>
          <Image source={require("../assets/products/Ellipse 31.png")} style={styles.categoryImg} />
          <Text style={[styles.categorynametxt, theme === 'dark' ? styles.darkText : styles.lightText]}>Accessories</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryContainer;

const styles = StyleSheet.create({
  categoryContainer: {
    width: 342,
    height: 116,
    gap: 16,
  },
  categoryHeadingTexts: {
    width: 341,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryHdBoldTxt: {
    fontFamily: "Gabarito",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 19.2,
  },
  categoryHdtxt: {
    fontFamily: "Circular Std",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 20.24,
  },
  categoryImg: {
    width: 56,
    height: 56,
    borderRadius: 100,
  },
  categoryItemContainer: {
    width: 342,
    height: 80,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  categoryItemBox: {
    width: 56,
    height: 80,
    gap: 5,
    alignItems: "center", // Center align image and text
  },
  categorynametxt: {
    width: 45,
    height: 19,
    fontFamily: "Circular Std",
    fontSize: 12,
    lineHeight: 19.2,
    fontWeight: "400",
    textAlign: "center", // Center text under the image
  },
  lightText: {
    color: "#272727",
  },
  darkText: {
    color: "#FFFFFF",
  },
});