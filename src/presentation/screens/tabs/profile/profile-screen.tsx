import GoalsCard from "@/src/presentation/components/ui/goals-card";
import WeightSelector from "@/src/presentation/components/ui/weight-selector";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../../components/ui/card";

export default function ProfileScreen() {
  const handleEmailSignUp = () => {
    console.log("Email registration pressed");
    // Hier kommt später die Email-Registrierungslogik
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up pressed");
    // Hier kommt später die Google OAuth Logik
  };

  const handleAppleSignUp = () => {
    console.log("Apple sign up pressed");
    // Hier kommt später die Apple OAuth Logik
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Profil</Text>
          <IconButton
            icon="cog"
            iconColor={MD3Colors.neutral90}
            size={25}
            onPress={() => console.log("Settings pressed")}
            style={{ alignSelf: "flex-end" }}
          />
        </View>
        {/* Registrierungs-Card */}
        <Card>
          <View style={styles.profileHeader}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>?</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Anonym</Text>
              <Text style={styles.profileSubtitle}>
                Registriere dich um alle Funktionen zu nutzen
              </Text>
            </View>
          </View>

          {/* Registrierungs-Optionen */}
          <View style={styles.registrationOptions}>
            {/* Email Registrierung */}
            <TouchableOpacity
              style={[styles.registrationButton, styles.emailButton]}
              onPress={handleEmailSignUp}
            >
              <IconButton
                icon="email"
                iconColor="#FFFFFF"
                size={20}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Mit E-Mail registrieren</Text>
            </TouchableOpacity>

            {/* Google Sign Up */}
            <TouchableOpacity
              style={[styles.registrationButton, styles.googleButton]}
              onPress={handleGoogleSignUp}
            >
              <IconButton
                icon="google"
                iconColor="#FFFFFF"
                size={20}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Mit Google fortfahren</Text>
            </TouchableOpacity>

            {/* Apple Sign Up */}
            <TouchableOpacity
              style={[styles.registrationButton, styles.appleButton]}
              onPress={handleAppleSignUp}
            >
              <IconButton
                icon="apple"
                iconColor="#FFFFFF"
                size={20}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Mit Apple fortfahren</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.loginHint}>
            Bereits ein Konto? <Text style={styles.loginLink}>Anmelden</Text>
          </Text>
        </Card>

        <Text style={styles.sectionTitle}>Aktuelles Gewicht</Text>
        <Card>
          <View style={styles.sectionContent}>
            <WeightSelector />
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Fortschritt</Text>
        <Card>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>
              TODO: Fortschrittsanzeige (am Besten mit Diagrammen/Charts - Man
              kann auf Monat/Woche/Jahr etc. umstellen wie so ein Trade-Chart)
            </Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Meine Ziele</Text>
        <Card>
          <GoalsCard />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileSubtitle: {
    color: "#aaa",
    fontSize: 14,
  },
  registrationOptions: {
    marginBottom: 15,
  },
  registrationButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  emailButton: {
    backgroundColor: "#007AFF",
  },
  googleButton: {
    backgroundColor: "#DB4437",
  },
  appleButton: {
    backgroundColor: "#000000",
  },
  buttonIcon: {
    margin: 0,
    marginRight: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loginHint: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
  },
  loginLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  sectionContent: {
    alignSelf: "center",
  },
  sectionText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
  },
});
