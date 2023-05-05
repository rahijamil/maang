import { StyleSheet, Text, View } from "react-native";

import Cart from "./screens/Cart";
import CartIcon from "./components/CartIcon";
import CartProvider from "./contexts/CartContext";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import ProductDetails from "./screens/ProductDetails";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="productDetails" component={ProductDetails} initialParams={{productId: null}} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Cart" component={Cart} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        {/* <MyStack /> */}
        <MyTabs />
        {/* <MyDrawer /> */}
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
  },
  cartText: {
    backgroundColor: "orange",
    padding: 12,
    marginRight: 8,
    borderRadius: 30,
    fontWeight: "bold",
  },
});
