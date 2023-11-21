import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ color = "primary", title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, { backgroundColor: colors[color] }]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
export default AppButton;
