import Menu from "../../components/Menu";
import { View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
