import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Like from "./Like";
import Account from "./Account";
import person from "../assets/person.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.accountIcon}
        onPress={() => {
          /* logic to handle account icon press */
        }}
      >
        <MaterialCommunityIcons name="account" size={40} color="black" />
      </TouchableOpacity>
      <Text>Home Screen</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Like" component={Like} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  accountIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    // Add more styling as needed
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default App;
