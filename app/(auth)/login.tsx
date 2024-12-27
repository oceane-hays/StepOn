import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FIREBASE_AUTH } from "@/services/FirebaseConfig";
import Logo from "@/app/(component)/logo";
import { ThemedText } from "@/components/ThemedText";
import { loginEmail } from "./loginEmail"; // Import the loginEmail function

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [usingEmail, setUsingEmail] = useState(false);
  const auth = FIREBASE_AUTH;
  const router = useRouter();

  const handleLogin = async () => {
    if (usingEmail) {
      try {
        const user = await loginEmail(email, password, setLoading, auth);
        if (user) {
          // Navigate to the main app screen or perform any other action
          router.push("/(tabs)"); // Replace with your actual home route
        }
      } catch (error: any) {
        Alert.alert("Login Error, wrong email or password");
      }
    } else {
      // Handle phone number login
      router.push("/(auth)/smsVerification");
    }
  };

  return (
      <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
        <SafeAreaView style={styles.container}>
          <Logo />

          <ThemedText style={styles.title}>CONNEXION</ThemedText>

          <View style={styles.inputContainer}>
            {usingEmail ? (
                <>
                  <TextInput
                      style={styles.input}
                      onChangeText={setEmail}
                      value={email}
                      placeholder="Email Address"
                      keyboardType="email-address"
                      autoCapitalize="none"
                  />
                  <TextInput
                      style={styles.input}
                      onChangeText={setPassword}
                      value={password}
                      placeholder="Password"
                      secureTextEntry={true}
                  />
                </>
            ) : (
                <TextInput
                    style={styles.input}
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              <Text style={styles.buttonText}>
                {usingEmail ? "Login" : "Send Code"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setUsingEmail(!usingEmail)}
          >
            <Text style={styles.switchButtonText}>
              {usingEmail
                  ? "Use your phone number instead"
                  : "Use your email address instead"}
            </Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <Text style={styles.noAccountText}>Don't have an account?</Text>
          <TouchableOpacity
              style={styles.signInButton}
              onPress={() => router.push("/signin")}
          >
            <Text style={styles.signInButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#0000ff" />}
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
    marginHorizontal: 20,
  },
  title: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 20,
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#5E83C0",
    alignItems: "center",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  switchButton: {
    marginTop: 20,
    padding: 10,
  },
  switchButtonText: {
    color: "#5E83C0",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#000000",
    opacity: 0.25,
    marginTop: 200,
  },
  noAccountText: {
    fontSize: 14,
    marginBottom: 10,
  },
  signInButton: {
    padding: 10,
  },
  signInButtonText: {
    color: "#5E83C0",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

