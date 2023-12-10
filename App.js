import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Swipe from "./app/screens/Swipe2";
import DisplayInfo from "./app/screens/DisplayInfo";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

const App = () => {
  // Load fonts
  const [fontsLoaded] = useFonts({
    "Gotham-Rounded-Medium": require("./app/assets/fonts/Gotham-Rounded-Medium.otf"),
    "Gotham-Rounded-Bold": require("./app/assets/fonts/Gotham-Rounded-Bold.otf"),
  });

  // Wait for font loading
  if (!fontsLoaded) {
    return null; // You might want to render a loading indicator while fonts are loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Swipe"
          options={{
            headerTitleAlign: "center",
          }}
        >
          {(props) => (
            <View style={styles.container}>
              <Swipe {...props} />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="DisplayInfo" component={DisplayInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Set a background color if needed
    marginLeft: "5%",
    marginRight: "5%",
  },
});

export default App;
