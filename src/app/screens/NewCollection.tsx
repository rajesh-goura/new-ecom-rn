import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { RootState, AppDispatch } from "../redux/store";
import Product from "./Product";

const NewCollection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector((state: RootState) => state.products);
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleHeartPress = (item: any) => {
    console.log(`Favorite clicked for: ${item.title}`);
  };

  return (
    <View>
      <View style={styles.newCollectionHeadingTexts}>
        <Text style={[styles.newCollectionHdBoldTxt, theme === 'dark' ? styles.darkText : styles.lightText]}>Top Selling</Text>
        <Text style={[styles.newCollectionHdtxt, theme === 'dark' ? styles.darkText : styles.lightText]}>See All</Text>
      </View>
      {status === "loading" && <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>Loading...</Text>}
      {status === "failed" && <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>Error: {error}</Text>}
      <View style={styles.newCollectionList}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          renderItem={({ item }) => (
            <Product
              id={item.id}
              title={item.title}
              price={item.price}
              thumbnail={item.thumbnail}
              onPressHeart={() => handleHeartPress(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </View>
    </View>
  );
};

export default NewCollection;

const styles = StyleSheet.create({
  newCollectionHeadingTexts: {
    width: 341,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 16,
  },
  newCollectionHdBoldTxt: {
    fontFamily: "Gabarito",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 19.2,
  },
  newCollectionHdtxt: {
    fontFamily: "Circular Std",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 20.24,
  },
  newCollectionList: {
    flexDirection: "row",
    gap: 12,
  },
  itemSeparator: {
    width: 12,
  },
  lightText: {
    color: "#272727",
  },
  darkText: {
    color: "#FFFFFF",
  },
});