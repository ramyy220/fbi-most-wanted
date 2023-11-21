import React from "react";
import { Image, View, StyleSheet, TouchableHighlight } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";

function ListItem({ image, onPress, title, subTitle, renderRightActions }) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight onPress={onPress} underlayColor={colors.light}>
        <View style={styles.bigView}>
          <Image
            source={image}
            style={{
              height: 70,
              width: 70,
              borderRadius: 35,
              marginHorizontal: 10,
            }}
          />
          <View style={{ padding: 10 }}>
            <AppText style={styles.text}>{title}</AppText>
            <AppText style={{ color: colors.medium }}>{subTitle}</AppText>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  bigView: {
    flexDirection: "row",
    width: "100%",
    padding: 5,
  },

  image: { width: "100%", height: 300 },
  detailContainer: {
    padding: 20,
  },
  text: {
    marginBottom: 7,
    fontWeight: "bold",
  },
});

export default ListItem;
