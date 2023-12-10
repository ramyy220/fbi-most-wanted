import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import TinderCard from "react-tinder-card";
import axios from "axios";
import { Link, useNavigation } from "@react-navigation/native"; // Import Link and useNavigation from react-navigation/native

// Get window dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Component styles
const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  header: {
    color: "#000",
    fontSize: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  cardContainer: {
    width: windowWidth * 0.0000000000001,
    height: windowHeight * 0.7,
    alignItems: "center",
  },
  card: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: "cover",
  },
  cardImage: {
    width: windowWidth * 0.65,
    height: windowHeight * 0.65,
    overflow: "hidden",
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  cardImageStyle: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 20,
  },
  cardTitle: {
    position: "absolute",
    bottom: 0,
    margin: 10,
    color: "#fff",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.65)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  button: {
    margin: 10,
  },
  infoText: {
    height: 28,
    justifyContent: "center",
    display: "flex",
  },
};

const alreadyRemoved = [];

const Swipe = () => {
  const [data, setData] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const childRefs = useRef([]);
  const navigation = useNavigation(); // Get the navigation object

  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction);
    setData((prevData) =>
      prevData.filter((item) => item.title !== nameToDelete)
    );

    if (direction === "right") {
      // Perform navigation on right swipe
      navigateToInfo(nameToDelete);
    }
  };

  const navigateToInfo = (name) => {
    // Use the navigation object to navigate to the "DisplayInfo" screen
    navigation.navigate("DisplayInfo", { person: { title: name } });
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const swipe = (dir) => {
    const cardsLeft = data.filter(
      (item) => !alreadyRemoved.includes(item.title)
    );
    if (cardsLeft.length > 0) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].title;
      alreadyRemoved.push(toBeRemoved);
      swiped(dir, toBeRemoved);
    } else {
      console.warn("No cards left to swipe");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.fbi.gov/@wanted", {
        params: {
          pageSize: 20,
          page: 1,
          sort_on: "modified",
          sort_order: "desc",
          poster_classification: "terrorist",
          status: "na",
        },
      });
      setData(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
      try {
        const localData = require("../assets/localData.json");
        setData(localData.items);
      } catch (localError) {
        console.error("Error fetching local data:", localError);
      }
    }
  };

  useEffect(() => {
    if (data && data.length > 0 && childRefs.current.length === 0) {
      childRefs.current = data.map(() => React.createRef());
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Most Wanted</Text>
      <View style={styles.cardContainer}>
        {data.map((item, index) => (
          <TinderCard
            ref={childRefs.current[index]}
            key={item.title}
            onSwipe={(dir) => swiped(dir, item.title)}
            onCardLeftScreen={() => outOfFrame(item.title)}
            preventSwipe={["up", "down"]}
            swipeRequirementType={"position"}
            swipeThreshold={120}
          >
            <View style={styles.card}>
              <ImageBackground
                style={styles.cardImage}
                source={{
                  uri:
                    item.images && item.images.length > 0
                      ? item.images[0].original
                      : null,
                }}
                imageStyle={styles.cardImageStyle}
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
              </ImageBackground>
            </View>
          </TinderCard>
        ))}
      </View>
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={() => swipe("left")}>
          <Text>Swipe left</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => swipe("right")}>
          <Text>Swipe right</Text>
        </Pressable>
      </View>
      {lastDirection ? (
        <Text style={styles.infoText} key={lastDirection}>
          You swiped {lastDirection}
        </Text>
      ) : (
        <Text style={styles.infoText}>Swipe a card to get started!</Text>
      )}
    </View>
  );
};

export default Swipe;

// Print the whole modified Swipe component
console.log(Swipe);
