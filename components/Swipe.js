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
import { useNavigation } from "@react-navigation/native";
import { filterData } from "../components/filter";
import firebase from "../config/firebase";
import { auth, firestore } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
    backgroundColor: "#e6eef8",
  },
  header: {
    color: "#000",
    fontSize: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  cardContainer: {
    width: windowWidth * 0.0000000000001,
    height: windowHeight * 0.6,
    alignItems: "center",
  },
  card: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    resizeMode: "cover",
  },
  cardImage: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.6,
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

  const swiped = async (direction, person) => {
    setLastDirection(direction);
    setData((prevData) =>
      prevData.filter((item) => item.title !== person.title)
    );

    if (direction === "right") {
      try {
        const user = auth.currentUser;
    
        const swipesCollection = collection(firestore, 'swipes');
        await addDoc(swipesCollection, {
            title: person.title,
            image: person.image,
            swipedRight: true,
            users: user.uid, // Add the user's ID here
            timestamp: serverTimestamp(),
        });
        console.log("Swipe enregistré dans Firebase");
        navigateToInfo(person);
      } catch (error) {
        console.error("Erreur d'enregistrement dans Firebase:", error);
      }
    }
};

  const navigateToInfo = (person) => {
    // Use the navigation object to navigate to the "DisplayInfo" screen
    navigation.navigate("DisplayInfo", { person });
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
      swiped(dir, cardsLeft[cardsLeft.length - 1]);
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
      const modifiedData = filterData(response);
      setData(modifiedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.error("Erreur lors de la récupération des données de l'API:", error);
      
      try {
        const localData = require("../assets/localData.json");
        const modifiedData = filterData(localData);
        setData(modifiedData);
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
            onSwipe={(dir) => swiped(dir, item)}
            onCardLeftScreen={() => outOfFrame(item.title)}
            preventSwipe={["up", "down"]}
            swipeRequirementType={"position"}
            swipeThreshold={120}
          >
            <View style={styles.card}>
              <ImageBackground
                style={styles.cardImage}
                source={{
                  uri: item.image,
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