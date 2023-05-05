import React from "react";
import { View } from "react-native";

const Row = ({ children }) => {
  return <View style={{ flexDirection: "row" }}>{children}</View>;
};

export default Row;
