import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

const NavigationBar = () => {
  return (
    <View style={styles.navigationBarContainer}>
      <View style={styles.navigationBtnContainer}>
        <TouchableOpacity>
          <Image
            style={styles.navigationBtn}
            source={require("../assets/icons/Frame 50.png")}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.navigationBtn}
            source={require("../assets/icons/Frame 52.png")}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.navigationBtn}
            source={require("../assets/icons/Frame 53.png")}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.navigationBtn}
            source={require("../assets/icons/Frame 54.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
    navigationBarContainer:{
        width:"100%",
        height:80,
        paddingHorizontal:24,
    },
    navigationBtnContainer:{
        width:"100%",
        height:40,
        marginVertical:18,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    navigationBtn:{
        width:40,
        height:40,
    }
});
