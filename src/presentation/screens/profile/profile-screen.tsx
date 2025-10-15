import { Host, Text } from "@expo/ui/swift-ui";
import { glassEffect, padding } from "@expo/ui/swift-ui/modifiers";
import { StyleSheet, View } from "react-native";
export const PROFILE_ROUTE = "Profile";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Host
        style={{ position: "absolute", top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <Text
          size={32}
          modifiers={[
            padding({
              all: 16,
            }),
            glassEffect({
              glass: {
                variant: "clear",
              },
            }),
          ]}
        >
          Glass effect text
        </Text>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
});
