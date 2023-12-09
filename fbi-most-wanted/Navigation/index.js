import React from 'react'
import { View, Text} from 'react-native'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import HomeScreen from '../screens/HomeScreen'


const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      < Stack.Screen name="Login" component={LoginScreen} />
      < Stack.Screen name="Signup" component={SignUpScreen} />
      < Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
      < Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
