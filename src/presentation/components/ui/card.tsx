import { StyleSheet, View } from "react-native";

type CardProps = {
  children?: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    borderColor: "#404040",
    borderRadius: 35,
    borderWidth: 2,
    padding: 20,
    elevation: 5,
    margin: 10,
  },
});
