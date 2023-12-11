import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DisplayInfo = ({ route }) => {
  const { person } = route.params;
  console.log("Printing person:", person);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{person.title}</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: person.image }} />
        <View style={styles.textContainerPosition}>
          {person.armed && (
            <Text style={styles.warning}>ARMED AND DANGEROUS</Text>
          )}
          {person.eyes_raw !== "" && (
            <Text style={styles.textContainer}>{person.reward}</Text>
          )}
          {person.eyes && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.textContainer}>Eye Color: </Text>
              <View
                style={{
                  backgroundColor: person.eyes,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  imageContainer: {
    flexDirection: "row", // Keep this as 'row'
    position: "absolute",
    top: windowHeight * 0.05, // 5% of the window height
    left: windowWidth * 0.05, // 5% of the window width
  },
  textContainer: {
    fontSize: windowWidth * 0.05,
    fontWeight: "bold",
    textAlign: "left",
    color: "#fff",
    marginLeft: 10,
  },
  textContainerPosition: {
    flexDirection: "column", // New style for the text container
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10, // half of width and height
  },
  warning: {
    fontSize: windowWidth * 0.045, // 4.5% of the window width
    fontWeight: "bold",
    textAlign: "left",
    color: "red",
    marginLeft: 10,
  },
});

export default DisplayInfo;
