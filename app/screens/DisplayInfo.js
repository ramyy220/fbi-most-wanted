import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DisplayInfo = ({ route }) => {
  const { person } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test: {person.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
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
