import { Stack } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchIndex() {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Tastatur automatisch öffnen
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const isIOS = Platform.OS === "ios";

  return isIOS ? (
    // ✅ Für iOS 26+ (Native SearchTab übernimmt)
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
      }}
    >
      {/* Screen content */}
    </ScrollView>
  ) : (
    // ✅ Für Android
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#121212",
          padding: 16,
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 20,
            color: "#fff",
            fontWeight: "bold",
            marginTop: 15,
            marginBottom: 10,
          }}
        >
          Search
        </Text>
        <TextInput
          ref={inputRef}
          placeholder="Wonach suchst du?"
          placeholderTextColor={"#fff"}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
          }}
        />
        {/* hier kommen deine Suchergebnisse */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212", // Dark Mode
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
});
