import React from "react";
import { Image, StyleSheet, View } from "react-native";

import AppText from "../components/AppText";
import ListItem from "../components/ListItem";

function ListingEditScreen({ title, subTitle }) {
  return (
    <View>
      <Image style={styles.image} source={require("../assets/jacket.jpg")} />
      <View style={styles.detailContainer}>
        <AppText style={styles.text}>{title}</AppText>
        <AppText color="secondary">{subTitle}</AppText>
      </View>
      <ListItem
        image={require("../assets/tristan.png")}
        subTitle="5 Listings"
        title="Tristan DUMAS"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  bigView: {
    flexDirection: "row",
    width: "100%",
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

export default ListingEditScreen;
