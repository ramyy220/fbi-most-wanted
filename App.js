import React from "react";
import { View, StyleSheet } from "react-native";
import Swipe from "./app/screens/Swipe2";
import DisplayInfo from "./app/screens/DisplayInfo";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Gotham-Rounded-Medium": require("./app/assets/fonts/Gotham-Rounded-Medium.otf"),
    "Gotham-Rounded-Bold": require("./app/assets/fonts/Gotham-Rounded-Bold.otf"),
  });

  if (!fontsLoaded) {
    // You might want to render a loading indicator while fonts are loading
    return null;
  }

  return (
    <View style={styles.container}>
      <Swipe />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Set a background color if needed
  },
});
