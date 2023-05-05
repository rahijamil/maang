import { StyleSheet, Text, View } from "react-native";

import React from "react";
import { useCart } from "../contexts/CartContext";

const CartIcon = ({ navigation }: { navigation: any }) => {
  const { getItemsCount } = useCart();

  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        onPress={() => {
          navigation.navigate("cart");
        }}
      >
        Cart ({getItemsCount()})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: "orange",
    height: 32,
    padding: 12,
    borderRadius: 32 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CartIcon;
