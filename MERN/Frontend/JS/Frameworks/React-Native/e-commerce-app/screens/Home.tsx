import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import { ProductType, getProducts } from "../services/products.service";
import React, { useEffect, useState } from "react";

import Product from "../components/Product";

const Home = ({ navigation }: { navigation: any }) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <ScrollView>
      <FlatList
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        data={products}
        renderItem={({ item }) => (
          <Product
            product={item}
            onPress={() =>
              navigation.navigate("productDetails", { productId: item.id })
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: "#eeeeee",
  },
  productsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});

export default Home;
