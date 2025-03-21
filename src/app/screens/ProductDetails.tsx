import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../types"; // Import the RootStackParamList type

type ProductDetailsProps = StackScreenProps<RootStackParamList, 'ProductDetails'>;

export default function ProductDetails({ route }: ProductDetailsProps) {
  const { id } = route.params;
  const { colors } = useTheme();
  const productFromState = useAppSelector((state) =>
    state.products.products.find((p) => p.id === id)
  );
  const [product, setProduct] = useState<any>(productFromState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!product) {
      // Fetch product details using the id if not found in the state
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`https://dummyjson.com/products/${id}`);
          setProduct(response.data);
          setError(null); // Clear any previous errors
        } catch (error) {
          console.error("Failed to fetch product details:", error);
          setError("Failed to fetch product details. Please try again later.");
        }
      };
      fetchProductDetails();
    }
  }, [id, product]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={{ color: colors.text }}>Product id: {id}</Text>
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          {product.title}
        </Text>
        <Text style={[styles.price, { color: colors.text }]}>
          ${product.price.toFixed(2)}
        </Text>
        <Text style={[styles.description, { color: colors.text }]}>
          {product.description}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    marginTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});