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
import Logo from "@/app/(component)/logo";

export default function Login() {
  const [number, onChangeNumber] = React.useState("");
  const [usingEmail, setUsingEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Logo/>

        <ThemedText style={styles.title}>CONNEXION</ThemedText>
        {usingEmail ? (
            <View style = {{ width: "100%" , alignItems: "center"}} >
              <TextInput
                  style={styles.input}
                  onChangeText={(t) => setEmail(t)}
                  value={email}
                  placeholder="Email Adress"
                  keyboardType="email-address"
              />
              <TextInput
                  style={styles.input}
                  onChangeText={(t) => setEmail(t)}
                  value={email}
                  placeholder="Password"
                  keyboardType="visible-password"
              />
            </View>

        ) : (
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Numéro de téléphone"
            keyboardType="numeric"
          />
        )}

        <TouchableOpacity
            style={styles.bouton}
            onPress={() => {
              router.push("/(auth)/smsVerification");
            }}
        >
          <Text style={styles.buttonText}>Send code</Text>
        </TouchableOpacity>

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


        <View style={styles.separator}/>
        <Text>or, you don't have account</Text>
        <TouchableOpacity
            style={{...styles.emailBouton}}
            onPress={() => router.push("/signin")}>
          <Text style={{...styles.emailBoutonText, justifyContent : "flex-end"}}>Sign In</Text>
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
    justifyContent: "space-between",
  },
  title: {
    color: "#000000",
    fontWeight: "bold", // texte en gras
    fontSize: 20,
    paddingTop: 20,
  },

  input: {
    width: "90%",
    padding: 10,
    margin: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 15,
  },
  bouton: {
    backgroundColor: "#5E83C0",
    alignItems: "center",
    paddingVertical: 10, // haut et bas
    width: "90%", // gauche et droite
    borderRadius: 5, // ajout d'un rayon pour des coins arrondis
  },
  buttonText: {
    color: "#FFFFFF", // couleur blanche
    fontWeight: "bold", // texte en gras
    fontSize: 16, // taille de police optionnelle
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

  separator: {
    height: 1, // hauteur de la ligne
    width: "80%", // largeur de la ligne (ajustable)
    backgroundColor: "#000000", // couleur de la ligne
    opacity: 0.25,
    marginTop: 200,
  },
});
