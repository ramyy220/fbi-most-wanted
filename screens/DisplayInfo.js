import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Linking,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { COLORS } from "../config/COLORS";
import Icon from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DisplayInfo = ({ route }) => {
  const navigation = useNavigation();
  const { person } = route.params;
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isCautionExpanded, setCautionExpanded] = useState(false);
  const [isRemarksExpanded, setRemarksExpanded] = useState(false);

  const handleButtonPress = () => {
    if (person.files && person.files[0] && person.files[0].url) {
      console.log("Opening URL:", person.files[0].url);
      Linking.openURL(person.files[0].url);
    } else {
      console.log("URL not defined or not valid");
    }
  };

  return (
    <>
      <View style={styles.container}>
        {!isDescriptionExpanded && !isCautionExpanded && !isRemarksExpanded && (
          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="cash-outline"
                style={styles.iconStyle}
                color={COLORS.text}
              />
              <Text style={styles.text}>{person.reward || "Unknown"}</Text>
            </View>
            {person.eyes && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  name="eye-outline"
                  style={styles.iconStyle}
                  color={COLORS.text}
                />
                <Text style={styles.text}>{person.eyes_raw || "Unknown"} </Text>
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

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="calendar-outline"
                style={styles.iconStyle}
                color={COLORS.text}
              />
              <Text style={styles.text}>
                {person.age ||
                  (person.dates_of_birth_used &&
                  person.dates_of_birth_used.length > 0
                    ? person.dates_of_birth_used[0]
                    : "Unknown")}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5
                name="globe"
                style={styles.iconStyle}
                color={COLORS.text}
              />
              <Text style={styles.text}>{person.nationality || "Unknown"}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="cut-outline"
                style={styles.iconStyle}
                color={COLORS.text}
              />
              <Text style={styles.text}>{person.hair_raw || "Unknown"}</Text>
            </View>
            {person.weight && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  name="body-outline"
                  style={styles.iconStyle}
                  color={COLORS.text}
                />
                <Text style={styles.text}>
                  {person.height_max
                    ? Math.round(parseInt(person.height_max) * 2.54) + "cm "
                    : "Unknown "}
                  {Math.round(parseInt(person.weight) * 0.453592)}kg
                </Text>
              </View>
            )}
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 50,
          }}
        >
          {!isCautionExpanded && !isRemarksExpanded && person.description && (
            <TouchableOpacity
  style={[styles.infoContainer, { flex: 1, margin: 10 }]}
  onPress={() => setDescriptionExpanded(!isDescriptionExpanded)}
>
  <Text style={[styles.text, { fontWeight: "bold" }]}>
    Description
  </Text>
  <View style={{ alignSelf: 'center' }}>
    <AntDesign
      name={isDescriptionExpanded ? "up" : "down"}
      size={24}
      color={COLORS.text}
    />
  </View>
  {isDescriptionExpanded && (
    <Text style={styles.text}>{person.description}</Text>
  )}
</TouchableOpacity>
          )}

          {!isDescriptionExpanded && !isRemarksExpanded && person.caution && (
            <TouchableOpacity
  style={[styles.infoContainer, { flex: 1, margin: 10 }]}
  onPress={() => setCautionExpanded(!isCautionExpanded)}
>
  <Text style={[styles.text, { fontWeight: "bold" }]}>
    Caution
  </Text>
  <View style={{ alignSelf: 'center' }}>
    <AntDesign
      name={isCautionExpanded ? "up" : "down"}
      size={24}
      color={COLORS.text}
    />
  </View>
  {isCautionExpanded && (
    <Text style={styles.text}>{person.caution}</Text>
  )}
</TouchableOpacity>
          )}

          {!isDescriptionExpanded && !isCautionExpanded && person.remarks && (
            <TouchableOpacity
  style={[styles.infoContainer, { flex: 1, margin: 10 }]}
  onPress={() => setRemarksExpanded(!isRemarksExpanded)}
>
  <Text style={[styles.text, { fontWeight: "bold" }]}>
    Remarks
  </Text>
  <View style={{ alignSelf: 'center' }}>
    <AntDesign
      name={isRemarksExpanded ? "up" : "down"}
      size={24}
      color={COLORS.text}
    />
  </View>
  {isRemarksExpanded && (
    <Text style={styles.text}>{person.remarks || "Unknown"}</Text>
  )}
</TouchableOpacity>
          )}
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: person.image }} />
          <View style={styles.textSideContainerPosition}>
            {person.armed && (
              <Text style={styles.warning}>ARMED AND DANGEROUS</Text>
            )}
            <Text style={styles.textSideContainer}>{person.title}</Text>
            {person.modified && (
              <Text
                style={{
                  ...styles.textSideContainer,
                  fontSize: 12,
                  color: COLORS.primary,
                }}
              >
                Last updated:{" "}
                {new Date(person.modified).toLocaleDateString("en-EN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton onPress={handleButtonPress} text="Download Report" />
        <Pressable style={styles.left} onPress={() => navigation.navigate('Home')}>
           <MaterialCommunityIcons name="arrow-left" size={50} color={COLORS.primary} />
          </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 10,
  },
  iconStyle: {
    marginRight: 10,
    fontSize: windowWidth * 0.08,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.text,
  },
  imageContainer: {
    flexDirection: "row", // Keep this as 'row'
    position: "absolute",
    top: windowHeight * 0.05, // 5% of the window height
    left: windowWidth * 0.05, // 5% of the window width
  },
  textSideContainer: {
    fontSize: windowWidth * 0.05,
    fontWeight: "bold",
    textAlign: "left",
    color: COLORS.primary,
    marginLeft: 10,
  },
  textSideContainerPosition: {
    flexDirection: "column",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
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
