import { StyleSheet } from "react-native";

export const SearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  androidTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    marginHorizontal: 16,
    marginTop: 8,
    alignItems: "center",
  },
  resultsCount: {
    color: "#888",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
});