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
    </Stack>
  );
}
