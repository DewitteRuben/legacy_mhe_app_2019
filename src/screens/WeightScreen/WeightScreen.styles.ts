import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create<any>({
  wrapper: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentCentered: {
    textAlign: "center"
  },
  controls: {
    marginTop: "auto"
  },
  progressWrapper: {
    width: "100%"
  },
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
