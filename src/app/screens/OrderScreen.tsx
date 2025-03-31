import { View, Text, Button, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import firestore from "@react-native-firebase/firestore";

const OrderScreen = () => {
  const [clothe, setCloth] = useState(null); // Initialize as null instead of undefined

  const getClothedata = async () => {
    try {
      const clotheCollection = await firestore().collection("clothes").get();
      if (!clotheCollection.empty) {
        const data:any = clotheCollection.docs[0].data();
        console.log(data);
        setCloth(data);
      }
    } catch (error) {
      console.error("Error fetching clothes:", error);
    }
  };

  useEffect(() => {
    getClothedata();
  }, []);

  return (
    <View>
      <Text>this is OrderScreen</Text>
      <View style={styles.container}>
        <Button title="Open a URL" onPress={() => Linking.openURL("https://expo.dev/")} />
      </View>

      {/* Check if clothe is not null before rendering */}
      {clothe ? (
        <>
          {/* <Text>{clothe.title}</Text>
          <Text>{clothe.price}</Text>
          <Image source={{ uri: clothe.image_url }} style={{ height: 150, width: 150 }} /> */}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
});
