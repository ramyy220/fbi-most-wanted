import React from "react";

import { StyleSheet, Text, Platform } from "react-native";

import colors from "../config/colors";

function AppText({ children, color = "black", style }) {
  return (
    <Text style={[styles.text, { color: colors[color] }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppText;
