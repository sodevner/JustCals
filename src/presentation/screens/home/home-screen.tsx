import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { IconButton, MD3Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/ui/card";

export const HOME_ROUTE = "Home";

export default function HomeScreen() {
  const dailyGoal = 2500;
  const currentCalories = 2000;

  const progress = currentCalories / dailyGoal;

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon="calendar"
        iconColor={MD3Colors.neutral90}
        size={25}
        onPress={() => console.log("Pressed")}
        style={{ alignSelf: "flex-end" }}
      />
      <Text style={[styles.dayTitle, { alignSelf: "flex-start" }]}>Heute</Text>
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
        Übersicht
      </Text>
      <Card>
        <View style={styles.circleContainer}>
          <AnimatedCircularProgress
            size={150}
            width={15}
            backgroundWidth={5}
            fill={Math.min(progress * 100, 100)}
            tintColor={currentCalories > dailyGoal ? "#ff0000" : "#00ff00"}
            backgroundColor="#3d5875"
            arcSweepAngle={240}
            rotation={240}
            lineCap="round"
          >
            {() => (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 25 }}
                >
                  {dailyGoal - currentCalories}
                </Text>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Übrig</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>

        <View style={styles.macros}>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Kohlenhydrate</Text>
            <View style={styles.macroBarBackground}>
              <View
                style={[
                  styles.macroBarFill,
                  { width: `${(180 / 300) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.macroValue}>180g</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Eiweiß</Text>
            <View style={styles.macroBarBackground}>
              <View
                style={[
                  styles.macroBarFill,
                  { width: `${(180 / 300) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.macroValue}>180g</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Fett</Text>
            <View style={styles.macroBarBackground}>
              <View
                style={[
                  styles.macroBarFill,
                  { width: `${(180 / 300) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.macroValue}>180g</Text>
          </View>
        </View>
      </Card>
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
            Ernährung
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
            Haribos (eine Packung) - 372kcal
          </Text>
        </View>
      </Card>
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
            Aktivitäten
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
            Laufen - 253kcal
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
