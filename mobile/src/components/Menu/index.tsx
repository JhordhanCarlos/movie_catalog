import { View, Text } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/core";

export default function Menu() {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <View
        style={styles.menuItem}
        onTouchEnd={() => navigation.navigate("Search")}
      >
        <Text>SEARCH A MOVIE</Text>
      </View>
      <View
        style={styles.menuItem}
        onTouchEnd={() => navigation.navigate("MyMovies")}
      >
        <Text>MY MOVIES</Text>
      </View>
    </View>
  );
}
