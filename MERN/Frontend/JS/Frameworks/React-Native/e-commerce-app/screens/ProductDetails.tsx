import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ProductType, getProduct } from "../services/products.service";
import React, { useEffect, useState } from "react";

import { useCart } from "../contexts/CartContext";

const ProductDetails = ({ route }: { route: any }) => {
  const [product, setproduct] = useState<ProductType>();

  const {handleAddToCart} = useCart()

  const { productId } = route.params;

  useEffect(() => {
    setproduct(getProduct(productId));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Image source={product?.image} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product?.name}</Text>
          <Text style={styles.price}>{product?.price}</Text>
          <Text style={styles.description}>{product?.description}</Text>

          <Button title="Add to cart" onPress={() => handleAddToCart(product?.id as number)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#787878",
    marginBottom: 16,
  },
});

export default ProductDetails;
