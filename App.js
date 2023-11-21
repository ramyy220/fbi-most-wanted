import { View } from "react-native";
import Swipe from "./app/screens/Swipe";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Gotham-Rounded-Medium": require("./app/assets/fonts/Gotham-Rounded-Medium.otf"),
    "Gotham-Rounded-Bold": require("./app/assets/fonts/Gotham-Rounded-Bold.otf"),
  });

  return (
    <View>
      <Swipe />
    </View>
  );
}
