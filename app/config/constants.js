import { useFonts } from "expo-font";

export default {
  [fontsLoaded]: useFonts({
    "Gotham-Rounded-Medium": require("../assets/fonts/Gotham-Rounded-Medium.otf"),
    "Gotham-Rounded-Bold": require("../assets/fonts/Gotham-Rounded-Bold.otf"),
  }),
};
