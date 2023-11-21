import React from "react";
import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListItemDeleteActions({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          backgroundColor: "red",
          width: 70,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons name="trash-can" color="white" size={35} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});

export default ListItemDeleteActions;
