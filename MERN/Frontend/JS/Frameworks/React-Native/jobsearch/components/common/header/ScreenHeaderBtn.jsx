import { Image, Text, View } from "react-native";

import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./screenheader.style";

const ScreenHeaderBtn = ({ iconURL, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconURL}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
