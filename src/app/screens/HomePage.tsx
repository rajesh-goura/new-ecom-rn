import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import CategoryContainer from "./CategoryContainer";
import TopSellingContainer from "./TopSellingContainer";
import NewCollection from "./NewCollection";
import NavigationBar from "./NavigationBar";
import { useAppSelector } from "../redux/hooks";

const HomePage = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const scrollY = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const [prevScrollY, setPrevScrollY] = useState(0);

  const handleScroll = (e:any) => {
    const currentScrollY = e.nativeEvent.contentOffset.y;
    const diff = currentScrollY - prevScrollY;
    setPrevScrollY(currentScrollY);



    Animated.timing(animatedOpacity, {
      toValue: diff > 0 ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(scrollY, {
      toValue: diff > 0 ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const translateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
     
      <Animated.View
        style={[styles.searchBarContainer, { transform: [{ translateY }] }]}
      >
        <SearchBar />
      </Animated.View>

      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.mainContainer}>
         
          <View style={styles.topSection}>
            <TouchableOpacity style={styles.topSectionBtn}>
              <Image
                style={styles.profileImage}
                source={require("../assets/profile/Ellipse 13.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderBtn,
                theme === "dark" ? styles.darkGenderBtn : styles.lightGenderBtn,
              ]}
            >
              <Text
                style={[
                  styles.boldTxt,
                  theme === "dark" ? styles.darkText : styles.lightText,
                ]}
              >
                Men {"V"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topSectionBtn}>
              <Image
                style={styles.iconImage}
                source={require("../assets/icons/Frame 32.png")}
              />
            </TouchableOpacity>
          </View>

          
          <Animated.View style={{ opacity: animatedOpacity }}>
          <CategoryContainer />
          </Animated.View>
          <TopSellingContainer />
          <NewCollection />
          <NewCollection />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: "#FFFFFF",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  mainContainer: {
    paddingRight: 24,
    paddingLeft: 24,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    justifyContent: "space-between",
    marginVertical: 10,
    flexDirection: "row",
    width: 342,
    height: 40,
  },
  topSectionBtn: {
    width: 40,
    height: 40,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  genderBtn: {
    width: 72,
    height: 40,
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  lightGenderBtn: {
    backgroundColor: "#F4F4F4",
  },
  darkGenderBtn: {
    backgroundColor: "#3C3C3C",
  },
  boldTxt: {
    fontFamily: "Gabarito",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 14.4,
  },
  lightText: {
    color: "#272727",
  },
  darkText: {
    color: "#FFFFFF",
  },
  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  searchBarContainer: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
});
