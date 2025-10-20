import { StyleSheet } from "react-native";

export const StateStyles = StyleSheet.create({
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingContent: {
    alignItems: "center",
  },
  loadingTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  loadingSubtitle: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: "#D32F2F",
    padding: 20,
    margin: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  errorIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  errorTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  errorText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
    opacity: 0.9,
  },
  retryButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  noResults: {
    padding: 40,
    alignItems: "center",
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noResultsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  noResultsText: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
  noResultsHint: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
  },
  initialState: {
    padding: 40,
    alignItems: "center",
  },
  initialStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  initialStateTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  initialStateText: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  tipsContainer: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 8,
    width: "100%",
  },
  tipsTitle: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tip: {
    color: "#888",
    fontSize: 12,
    marginBottom: 4,
  },
});