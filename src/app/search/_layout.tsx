import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Search",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#121212",
          },

          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerSearchBarOptions: {
            placement: "automatic",
            placeholder: "Wonach suchst du?",
            onChangeText: () => {},
          },
        }}
      />
    </Stack>
  );
}
