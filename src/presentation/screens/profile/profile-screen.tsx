import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/ui/card";

export default function ProfileScreen() {
  const dailyGoal = 2500;
  const currentCalories = 2000;

  const progress = currentCalories / dailyGoal;

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon="cog"
        iconColor={MD3Colors.neutral90}
        size={25}
        onPress={() => console.log("Pressed")}
        style={{ alignSelf: "flex-end" }}
      />
      <Text style={[styles.dayTitle, { alignSelf: "flex-start" }]}>Profil</Text>
      <Card>
        <View style={{ alignSelf: "flex-start" }}>
          <Text
            style={{
              color: "#fff",
              alignSelf: "flex-start",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Anonym
          </Text>
          <Text
            style={{
              color: "#fff",
              alignSelf: "flex-start",
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            Registrieren oder einloggen! (TODO: Registrierung)
          </Text>
        </View>
      </Card>
      <Text
        style={{
          color: "#fff",
          alignSelf: "flex-start",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Fortschritt
      </Text>
      <Card>
        <View style={{ alignSelf: "flex-start" }}>
          <Text
            style={{
              color: "#fff",
              alignSelf: "flex-start",
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            TODO: Fortschrittsanzeige (am Besten mit Diagrammen/Charts - Man
            kann auf Monat/Woche/Jahr etc. umstellen wie so ein Trade-Chart)
          </Text>
        </View>
      </Card>
      <Text
        style={{
          color: "#fff",
          alignSelf: "flex-start",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Aktuelles Gewicht
      </Text>
      <Card>
        <View style={{ alignSelf: "flex-start" }}>
          <Text
            style={{
              color: "#fff",
              alignSelf: "flex-start",
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            TODO: Man kann das aktuelle Gewicht mit + und - einstellen
          </Text>
        </View>
      </Card>
      <Text
        style={{
          color: "#fff",
          alignSelf: "flex-start",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Meine Ziele
      </Text>
      <Card>
        <View style={{ alignSelf: "flex-start" }}>
          <Text
            style={{
              color: "#fff",
              alignSelf: "flex-start",
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            TODO: Man kann Ernährungsweise etc. einstellen (Ernährung: Low-Fat,
            Ziel: Abnehmen, Kalorien: 1555kcal, Schrittziele: 10000 Schritte, )
          </Text>
        </View>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212", // Dark Mode
  },
  dayTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginVertical: 5,
  },
  cardTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 16,
    fontWeight: "600",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  calText: {
    position: "absolute",
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  macros: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  macroItem: {
    alignItems: "center",
  },
  macroLabel: {
    color: "#aaa",
    fontSize: 14,
  },
  macroValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  macroBarBackground: {
    height: 6,
    width: 60, // maximale Breite des Balkens
    backgroundColor: "#333", // dunkler Hintergrund
    borderRadius: 3,
    marginVertical: 4,
  },

  macroBarFill: {
    height: 6,
    backgroundColor: "#00ff00", // Füllfarbe
    borderRadius: 3,
  },
});
