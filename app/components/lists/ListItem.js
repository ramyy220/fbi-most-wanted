import React from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function ListItem({
  image,
  IconComponent,
  onPress,
  title,
  subTitle,
  renderRightActions,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity onPress={onPress} underlayColor={colors.light}>
          <View style={styles.bigView}>
            {IconComponent}
            {image && (
              <Image
                source={image}
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  marginHorizontal: 10,
                }}
              />
            )}
            <View style={{ padding: 10, marginLeft: 10 }}>
              {title && <AppText style={styles.text}>{title}</AppText>}
              {subTitle && (
                <AppText style={{ color: colors.medium }}>{subTitle}</AppText>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bigView: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
    backgroundColor: colors.white,
  },

  image: { width: "100%", height: 300 },
  detailContainer: {
    justifyContent: "center",
  },
  text: {
    marginBottom: 7,
    fontWeight: "bold",
  },
});

export default ListItem;
