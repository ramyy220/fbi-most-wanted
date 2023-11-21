import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import Card from "../components/Card";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const Swipe = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (pageSize, page, sort_on, sort_order) => {
    try {
      const response = await axios.get("https://api.fbi.gov/@wanted", {
        params: {
          pageSize,
          page,
          sort_on,
          sort_order,
        },
      });
      const modifiedData = response.data.items.map((item) => {
        const lowerCaseTitle = item.title.toLowerCase();
        if (
          lowerCaseTitle.includes("john doe") ||
          lowerCaseTitle.includes("jane doe")
        ) {
          item.title = "Unknown suspect";
        } else {
          item.title = item.title.split("-")[0].trim();
        }
        return item;
      });
      setData(modifiedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1000, 1, "modified", "desc");
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  console.log(data);

  return (
    <View style={styles.container}>
      <Swiper
        cards={data} // Use the fetched data here
        renderCard={(person) => <Card person={person} />}
        infinite
        backgroundColor="white"
        cardHorizontalMargin={0}
        stackSize={2} // Number of cards shown in the background
        containerStyle={styles.swiperContainer} // Put in full screen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  swiperContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
});

export default Swipe;
