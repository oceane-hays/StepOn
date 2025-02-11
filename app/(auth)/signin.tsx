import { ThemedText } from '@/components/ThemedText';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {router} from "expo-router";



const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry = false } : any) => (
    <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999"
    />
);

const CustomCheckbox = ({ checked, onPress } : any) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
        <View style={[styles.checkbox, checked && styles.checked]}>
            {checked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>J'accepte les conditions d'utilisations</Text>
    </TouchableOpacity>
);

export default function SignInPage() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleSignUp = () => {
        if (!name || !address || !phone || !password || !confirmPassword) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }
        if (!acceptTerms) {
            alert('Veuillez accepter les conditions d\'utilisation.');
            return;
        }
        // router.push('/(auth)/smsVerification');
        router.push('/(auth)/healthData');
        console.log('Sign up successful');
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/Logo.png')} // Use this for a local image
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <ThemedText style={styles.title}>Créer un compte </ThemedText>

                <CustomTextInput placeholder="Name *" value={name} onChangeText={setName} />
                <CustomTextInput placeholder="Adress *" value={address} onChangeText={setAddress} />
                <CustomTextInput placeholder="Phone Number *" value={phone} onChangeText={setPhone} />
                <CustomTextInput placeholder="Email Adress" value={email} onChangeText={setEmail} />
                <CustomTextInput placeholder="Password *" value={password} onChangeText={setPassword} secureTextEntry />
                <CustomTextInput placeholder="Confirm Password *" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

                <CustomCheckbox checked={acceptTerms} onPress={() => setAcceptTerms(!acceptTerms)} />

                <TouchableOpacity style={styles.bouton} onPress={handleSignUp}>
                    <Text style={styles.boutonText}>Sign In</Text>
                </TouchableOpacity>


                <View style={{flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: '100%'}} >
                    <View style={styles.separator} />

                    <Text style={{fontSize: 14,
                        margin: 10,}}>or, you have a StepOn account</Text>

                    <TouchableOpacity style={styles.emailBouton}
                                      onPress={() => router.back()}>
                        <Text style={styles.emailBoutonText}>Log In</Text>
                    </TouchableOpacity>
                </View>


            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30, // Adjust this value to position the logo as needed
    },
    logo: {
        width: 130,
        height: 100,
    },
    title: {
        fontSize: 20,
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    checkboxContainer: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 4,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#007AFF',
    },
    checkmark: {
        color: 'white',
        fontSize: 14,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#333',
    },
    bouton: {
        backgroundColor: "#5E83C0",
        alignItems: 'center',
        paddingVertical: 10, // haut et bas
        width: '90%',
        marginTop: 30,
        borderRadius: 5,
    },
    boutonText: {
        color: "#FFFFFF", // couleur blanche
        fontWeight: "bold", // texte en gras
        fontSize: 16,
    },
    input: {
        width: '90%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 16,
    },
    separator: {
        height: 1, // hauteur de la ligne
        width: '90%', // largeur de la ligne (ajustable)
        backgroundColor: '#000000', // couleur de la ligne
        opacity: 0.25,
    },
    emailBouton: {
        backgroundColor: "#ffffff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    emailBoutonText: {
        color: "#5E83C0",
        fontSize: 16,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});