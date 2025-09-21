import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Screens/Home";
import Search from "./src/Screens/Search";
import MyMovies from "./src/Screens/MyMovies";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: { screen: Home, options: { headerShown: false } },
    Search: { screen: Search },
    MyMovies: { screen: MyMovies },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
