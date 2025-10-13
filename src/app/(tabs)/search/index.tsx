import { Stack } from "expo-router";
import { useEffect, useRef } from "react";
import { Platform, ScrollView, TextInput, View } from "react-native";

export default function SearchIndex() {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Tastatur automatisch öffnen
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const isIOS =
    Platform.OS === "ios";

  return isIOS ? (
    // ✅ Für iOS 26+ (Native SearchTab übernimmt)
    <ScrollView>{/* Screen content */}</ScrollView>
  ) : (
    // ✅ Für Android
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 16,
        }}
      >
        <TextInput
          ref={inputRef}
          placeholder="Search"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
          }}
        />
        {/* hier kommen deine Suchergebnisse */}
      </View>
    </>
  );
}
