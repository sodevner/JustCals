import React, { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { ensureGuestUser } from "../../../data/services/guestUserService";
import { createProfile } from "../../../data/services/userService";

export default function OnboardingScreen({ navigation }: any) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await ensureGuestUser(); // erstellt anonymen User, falls noch keiner existiert
      } catch (error: any) {
        Alert.alert("Fehler", error.message);
      }
      setLoading(false);
    };
    init();
  }, []);

  const handleSubmit = async () => {
    try {
      await createProfile({
        weight: Number(weight),
        height: Number(height),
        age: Number(age),
        gender,
        goal,
      });
      navigation.replace("HomeScreen");
    } catch (error: any) {
      Alert.alert("Fehler", error.message);
    }
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Lädt...</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Text>Gewicht (kg)</Text>
      <TextInput
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 12,
          padding: 8,
        }}
      />

      <Text>Größe (cm)</Text>
      <TextInput
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 12,
          padding: 8,
        }}
      />

      <Text>Alter</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 12,
          padding: 8,
        }}
      />

      <Text>Geschlecht</Text>
      <TextInput
        value={gender}
        onChangeText={setGender}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 12,
          padding: 8,
        }}
      />

      <Text>Ziel</Text>
      <TextInput
        value={goal}
        onChangeText={setGoal}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 12,
          padding: 8,
        }}
      />

      <Button title="Start" onPress={handleSubmit} />
    </View>
  );
}
