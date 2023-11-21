import React from "react";
import { StyleSheet, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({
  backgroundColor = "#000",
  iconColor = "#fff",
  name,
  size = 40,
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        //: backgroundColor, we don't need
        // this bcz name is the same (JS)
        justifyContent: "center",
        alignItems: "center",
      }} // We want a rounded background
    >
      <MaterialCommunityIcons name={name} size={size / 2} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default Icon;
