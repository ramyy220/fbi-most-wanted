import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function ViewImageScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.deleteIcon}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          color="white"
          size={35}
        />
      </View>

      <View style={styles.cancelIcon}>
        <MaterialCommunityIcons name="close" color="white" size={35} />
      </View>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../assets/chair.jpg")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  deleteIcon: {
    width: 50,
    height: 50,

    position: "absolute",
    top: 40,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelIcon: {
    width: 50,
    height: 50,

    position: "absolute",
    top: 40,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default ViewImageScreen;
