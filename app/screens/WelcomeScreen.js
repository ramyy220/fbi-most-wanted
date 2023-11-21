import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import App from "../../App";

function WelcomeScreen(props) {
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <AppText style={{ fontSize: 25 }}> Sell what you don't need</AppText>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={console.log("Login tapped")} />
        <AppButton
          title="Register"
          onPress={console.log("Register tapped")}
          color="secondary"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    paddingHorizontal: 15,
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },

  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.secondary,
  },
});

export default WelcomeScreen;
