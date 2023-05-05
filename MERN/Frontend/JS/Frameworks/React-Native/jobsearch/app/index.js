import { COLORS, SIZES, icons, images } from "../constants";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import Nearbyjobs from "../components/home/nearby/Nearbyjobs";
import Popularjobs from "../components/home/popular/Popularjobs";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
import Welcome from "../components/home/welcome/Welcome";

const Home = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconURL={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconURL={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setsearchTerm={setsearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
