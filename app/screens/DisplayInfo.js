import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DisplayInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.85,
    backgroundColor: "#000",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
});

export default DisplayInfo;
