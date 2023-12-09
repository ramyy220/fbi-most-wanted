import React, { useState, useEffect, useMemo } from "react";
import { ImageBackground, Text, View, Button, Dimensions } from "react-native";
import TinderCard from "react-tinder-card";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
    width: windowWidth * 0.65, // same as cardContainer
    height: windowHeight * 0.65, // same as cardContainer
    overflow: "hidden",
    borderRadius: 20,
    alignSelf: "center", // Center the image horizontally
    justifyContent: "center", // Center the
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
  infoText: {
    height: 28,
    justifyContent: "center",
    display: "flex",
  },
};

const alreadyRemoved = [];
let dataState = [];

const Swipe = () => {
  const [data, setData] = useState([]);
  const [lastDirection, setLastDirection] = useState();

  const childRefs = useMemo(() => {
    const refs = Array(data.length)
      .fill(0)
      .map(() => React.createRef());
    return refs;
  }, [data]);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete + " to the " + direction);
    setLastDirection(direction);
    dataState = dataState.filter((item) => item.title !== nameToDelete);
    setData(dataState);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const swipe = (dir) => {
    const cardsLeft = data.filter(
      (item) => !alreadyRemoved.includes(item.title)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].title;
      const index = data.map((item) => item.title).indexOf(toBeRemoved);
      alreadyRemoved.push(toBeRemoved);
      childRefs[index].current.swipe(dir);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      setData(response.data.items);
      dataState = response.data.items; // Set dataState here
    } catch (error) {
      console.error("Error fetching data:", error);
      const localData = require("../assets/localData.json");
      setData(localData.items);
      dataState = localData.items; // And here
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Removed the line here
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Most Wanted</Text>
      <View style={styles.cardContainer}>
        {data.map((item, index) => (
          <TinderCard
            ref={childRefs[index]}
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
                source={{ uri: item.images[0].original }}
                imageStyle={styles.cardImageStyle}
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
              </ImageBackground>
            </View>
          </TinderCard>
        ))}
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => swipe("left")} title="Swipe left!" />
        <Button onPress={() => swipe("right")} title="Swipe right!" />
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
