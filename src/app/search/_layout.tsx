// app/search/_layout.tsx
import { Stack } from "expo-router";
import { JSX } from "react/jsx-runtime";

export default function SearchLayout(): JSX.Element {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Suche",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerSearchBarOptions: {
            placement: "automatic",
            placeholder: "Wonach suchst du?",
          },
        }}
      />
      <Stack.Screen
        name="product-detail"
        options={{
          title: "Produkt hinzufügen", // 🔥 HIER den Titel ändern
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerTintColor: "#000",
          headerTitleStyle: { fontWeight: "bold" },
          // presentation: 'modal', // Optional: Als Modal
        }}
      />
    </Stack>
  );
}
