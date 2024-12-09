import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
// import { FieldValue } from 'firebase/firestore';
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SMSVerificationScreen from "@/app/(auth)/smsVerification";
import { useRouter } from "expo-router";

export default function Login() {
  const [number, onChangeNumber] = React.useState("");
  const [usingEmail, setUsingEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Logo.png")} // Use this for a local image
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <ThemedText style={styles.title}>CONNEXION</ThemedText>
        {usingEmail ? (
          <TextInput
            style={styles.input}
            onChangeText={(t) => setEmail(t)}
            value={email}
            placeholder="Adresse Email"
            keyboardType="email-address"
          />
        ) : (
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Numéro de téléphone"
            keyboardType="numeric"
          />
        )}

        <View style={styles.separator1} />

        <TouchableOpacity
          style={styles.emailBouton}
          onPress={() => setUsingEmail(!usingEmail)}
        >
          {!usingEmail ? (
            <Text style={styles.emailBoutonText}>
              or, use your email adress
            </Text>
          ) : (
            <Text style={styles.emailBoutonText}>
              or, use your phone number
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bouton}
          onPress={() => {
            router.push("smsVerification");
          }}
        >
          <Text style={styles.buttonText}>Send code</Text>
        </TouchableOpacity>

        <View style={styles.separator2} />

        <Text>or, you don't have account</Text>

        <TouchableOpacity
          style={styles.emailBouton}
          onPress={() => router.push("./(auth)/signin")}
        >
          <Text style={styles.emailBoutonText}>Sign In</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30, // Adjust this value to position the logo as needed
  },
  logo: {
    width: 130,
    height: 100,
  },
  title: {
    color: "#000000",
    fontWeight: "bold", // texte en gras
    fontSize: 20,
    marginBottom: 30,
  },
  input: {
    width: "80%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 15,
    fontSize: 16,
  },
  bouton: {
    backgroundColor: "#5E83C0",
    alignItems: "center",
    paddingVertical: 10, // haut et bas
    paddingHorizontal: 117, // gauche et droite
    marginTop: 30,
    borderRadius: 5, // ajout d'un rayon pour des coins arrondis
  },
  buttonText: {
    color: "#FFFFFF", // couleur blanche
    fontWeight: "bold", // texte en gras
    fontSize: 16, // taille de police optionnelle
  },
  separator1: {
    height: 1, // hauteur de la ligne
    width: "80%", // largeur de la ligne (ajustable)
    backgroundColor: "#000000", // couleur de la ligne
    opacity: 0.25,
    marginVertical: 15, // espace autour de la ligne
  },
  separator2: {
    height: 1, // hauteur de la ligne
    width: "80%", // largeur de la ligne (ajustable)
    backgroundColor: "#000000", // couleur de la ligne
    opacity: 0.25,
    marginVertical: 15, // espace autour de la ligne
    marginTop: 300,
  },
  emailBouton: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  emailBoutonText: {
    color: "#5E83C0",
    fontSize: 13, // texte plus petit
    textDecorationLine: "underline", // texte souligné
  },
});
