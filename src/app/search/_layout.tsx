import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Suche",
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
