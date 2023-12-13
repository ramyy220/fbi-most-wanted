import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Logo from "../assets/Seal_of_the_FBI.svg.png";
import { useState } from "react/cjs/react.development";
import CustomButton from "../components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomInput from "../components/CustomInput";
import { auth } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase.js";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigation = useNavigation();

  const onSignInPressed = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setEmailError("");
        setPasswordError("");
        Alert.alert("Login Success", "You have successfully logged in!", [
          { text: "OK" },
        ]);
        navigation.navigate("Swipe");
      })

      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/wrong-password") {
          setPasswordError("Incorrect password. Please try again.");
          setEmailError("");
        } else if (errorCode === "auth/user-not-found") {
          setEmailError("Email not found. Please try again.");
          setPasswordError("");
        } else {
          Alert.alert("Login Failed", error.message, [{ text: "OK" }]);
        }
      });
  };

  const onForgot = () => {
    navigation.navigate("Forgot");
  };
  const onSignInFacebook = () => {
    console.warn("Sign in with Facebook");
  };
  const onSignInGoogle = () => {
    console.warn("Sign in with Google");
  };
  const onSignInApple = () => {
    console.warn("Sign in with Apple");
  };
  const onSignUp = () => {
    navigation.navigate("Signup");
  };

  const { height } = useWindowDimensions();
  return (
    <ScrollView>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="email"
          value={email}
          setValue={setEmail}
          error={!!emailError}
          icone={
            <MaterialCommunityIcons
              name="email"
              size={20}
              color={emailError ? "red" : "#002176"}
            />
          }
        />
        {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <CustomInput
          placeholder="password"
          value={password}
          setValue={setPassword}
          error={!!passwordError}
          secureTextEntry
          icone={
            <MaterialCommunityIcons
              name="lock"
              size={20}
              color={passwordError ? "red" : "#002176"}
            />
          }
        />
        {!!passwordError && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}

        <CustomButton text="Sign In" onPress={onSignInPressed} />
        <CustomButton
          text="Forgot Password?"
          onPress={onForgot}
          type="TERTIARY"
        />

        <CustomButton
          text="Sign In with Facebook"
          onPress={onSignInFacebook}
          bgColor="#e7e1f4"
          fgColor="#4765a9"
          icone={
            <MaterialCommunityIcons name="facebook" size={20} color="#4765a9" />
          }
        />
        <CustomButton
          text="Sign In with Google"
          onPress={onSignInGoogle}
          bgColor="#fae9ea"
          fgColor="#dd4d44"
          icone={
            <MaterialCommunityIcons name="google" size={20} color="#dd4d44" />
          }
        />
        <CustomButton
          text="Sign In with Apple"
          onPress={onSignInApple}
          bgColor="#e3e3e3"
          fgColor="#363636"
          icone={
            <MaterialCommunityIcons name="apple" size={20} color="#363636" />
          }
        />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUp}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    maxWidth: 200,
    maxHeight: 200,
    marginTop: 50,
    marginBottom: 20,
  },
  root: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
  },
});

export default LoginScreen;
