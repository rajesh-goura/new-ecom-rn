import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import { useAppSelector } from "../redux/hooks";

interface ProductItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const NewCollection: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const theme = useAppSelector((state) => state.theme.theme);

  const fetchProducts = async () => {
    try {
      const response: any = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleHeartPress = (item: ProductItem) => {
    console.log(`Favorite clicked for: ${item.title}`);
  };

  return (
    <View>
      <View style={styles.newCollectionHeadingTexts}>
        <Text style={[styles.newCollectionHdBoldTxt, theme === 'dark' ? styles.darkText : styles.lightText]}>Top Selling</Text>
        <Text style={[styles.newCollectionHdtxt, theme === 'dark' ? styles.darkText : styles.lightText]}>See All</Text>
      </View>
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