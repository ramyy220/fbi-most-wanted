import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import Swipe from "../components/Swipe";
import DisplayInfo from "../screens/DisplayInfo";
import Account from "../screens/Account";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen
          name="Swipe"
          options={{
            headerTitleAlign: "center",
          }}
        >
          {(props) => (
            <View>
              <Swipe {...props} />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="DisplayInfo" component={DisplayInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
