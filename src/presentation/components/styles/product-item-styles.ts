import { StyleSheet } from "react-native";

export const ProductItemStyles = StyleSheet.create({
  productItem: {
    backgroundColor: "#1E1E1E",
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  productContent: {
    flex: 1,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  productName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
    flexShrink: 1,
  },
  nutritionGrade: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 30,
    alignItems: "center",
    flexShrink: 0,
  },
  nutritionGradeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  brandAndServingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  productBrand: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    marginRight: 8,
    flexShrink: 1,
  },
  servingText: {
    color: "#888",
    fontSize: 12,
    fontWeight: "500",
    backgroundColor: "#2A2A2A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexShrink: 0,
  },
  nutritionContainer: {
    marginBottom: 0,
  },
  nutritionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nutritionItem: {
    alignItems: "center",
    flex: 1,
  },
  nutritionValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  nutritionLabel: {
    color: "#888",
    fontSize: 10,
    textTransform: "uppercase",
  },
});