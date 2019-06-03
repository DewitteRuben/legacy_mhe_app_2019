import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create<any>({
  progress: {
    marginTop: 8
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  card: {
    width: Dimensions.get("window").width / 2 - 16 - 4
  }
});
