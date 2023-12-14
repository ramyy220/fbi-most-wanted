import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import Swipe from "../components/Swipe";
import DisplayInfo from "../screens/DisplayInfo";
import Account from "../screens/Account";
import Like from "../screens/Like";




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MainTabScreen = () => (
  <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Swipe') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Likes') {
          iconName = focused ? 'heart' : 'heart-outline';
        } else if (route.name === 'Account') {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Icon name={iconName} size={size} color='#002176' />;
      },
      tabBarShowLabel: false,
    })}
  >
    <Tab.Screen name="Swipe" component={Swipe} options={{ headerShown: false }} />
    <Tab.Screen name="Likes" component={Like} options={{ headerShown: false }} />
    <Tab.Screen name="Account" component={Account} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={MainTabScreen} />
        <Stack.Screen name="DisplayInfo" component={DisplayInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
