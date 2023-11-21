import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Card = ({ person }) => {
  const ageRange =
    person.age_min === person.age_max
      ? person.age_min
      : `${person.age_min} - ${person.age_max}`;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: person.images[0].original }}
        style={styles.cardImage}
      />
      <View style={styles.textContainer}>
        <View style={styles.row}>
          <Text style={styles.textBold}>{person.title}</Text>
          {typeof ageRange === "number" && (
            <>
              <Text style={styles.text}>, </Text>
              <Text style={styles.text}>{ageRange}</Text>
            </>
          )}
        </View>
        {person.details && (
          <Text style={styles.textDescription}>
            {person.details.replace(/<[^>]*>?/gm, "")}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white",
    overflow: "hidden", // Ensure text overflow is hidden
    marginTop: 4,
    marginBottom: 4,
  },
  textContainer: {
    padding: 16,
    justifyContent: "flex-end", // Align text at the bottom
    flex: 1,
  },
  text: {
    textAlign: "left", // Align text to the left
    fontSize: 24, // Adjust font size as needed
    fontFamily: "Gotham-Rounded-Medium",
    backgroundColor: "transparent",
  },
  textBold: {
    textAlign: "left", // Align text to the left
    fontSize: 24, // Adjust font size as needed
    fontFamily: "Gotham-Rounded-Bold",
    fontWeight: "bold", // Adjust font weight as needed
    backgroundColor: "transparent",
  },
  textDescription: {
    textAlign: "left", // Align text to the left
    fontSize: 10, // Adjust font size as needed
    fontFamily: "Gotham-Rounded-Medium",
    backgroundColor: "transparent",
  },
  cardImage: {
    width: "100%",
    height: 300,
    flex: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Card;
