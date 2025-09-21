import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  movieCard: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    marginBottom: 0,
    padding: 10,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonCardContainer: {
    marginHorizontal: 10,
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 85,
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonCard: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
