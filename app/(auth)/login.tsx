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
import { loginEmail } from "./loginEmail";
import SMSVerificationScreen from "@/app/(auth)/smsVerification";
import {loginPhone} from "@/app/(auth)/loginPhone";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [usingEmail, setUsingEmail] = useState(true);
  const [phoneEntered, setPhoneEntered] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const router = useRouter();

  const handleLogin = async () => {
    if (usingEmail) {
      try {
        const user = await loginEmail(email, password, setLoading, FIREBASE_AUTH);
        if (user) {
          router.push("/(tabs)");
          console.log(user);
        }
      } catch (error: any) {
        Alert.alert("Login Error", "Wrong email or password");
      } finally {
        setLoading(false);
      }

    } else {
      if (!phoneNumber) {
        Alert.alert("Error", "Phone number is required");
      } else {
        console.log('PHONE NUMBER : +1',phoneNumber);
        setPhoneEntered(true);

      //   try {
      //     setLoading(true);
      //     await loginPhone('+1', phoneNumber, setConfirm);
      //   } catch (error: any) {
      //     Alert.alert("Login Error", error.message || "Failed to send verification code");
      //   } finally {
      //     setLoading(false);
      //   }
      }
    }
  };


  const renderEmailLogin = () => (
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
  );

  const renderPhoneLogin = () => (
      phoneEntered ? (
          <SMSVerificationScreen />
      ) : (
          <>
            <Text style={styles.instructionText}>Enter your phone number below to log in</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                placeholder="Phone Number"
                keyboardType="phone-pad"
            />
          </>
      )
  );

  return (
      <SafeAreaProvider style={styles.safeAreaProvider}>
        <SafeAreaView style={styles.container}>
          <Logo />
          <View style={styles.inputContainer}>
            <ThemedText style={styles.title}>LOG IN</ThemedText>
            {usingEmail ? renderEmailLogin() : renderPhoneLogin()}
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              <Text style={styles.buttonText}>
                {usingEmail ? "Login" : (phoneEntered ? "Verify" : "Send Code")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.switchButton}
                onPress={() => {
                  setUsingEmail(!usingEmail);
                  setPhoneEntered(false);
                }}
            >
              <Text style={styles.switchButtonText}>
                {usingEmail
                    ? "Use your phone number instead"
                    : "Use your email address instead"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.separator} />
            <Text style={styles.noAccountText}>Don't have an account?</Text>
            <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => router.push("/signin")}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaProvider: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 20,
    marginBottom: 30,
  },
  inputContainer: {
    flex: 1,
    width: "90%",
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
  instructionText: {
    fontWeight: '300',
    marginBottom: 40,
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
    padding: 30,
  },
  switchButtonText: {
    color: "#5E83C0",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: "#000000",
    opacity: 0.25,
    marginBottom: 10,
  },
  noAccountText: {
    fontSize: 14,
    marginBottom: 10,
  },
  signUpButton: {
    padding: 10,
  },
  signUpButtonText: {
    color: "#5E83C0",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

