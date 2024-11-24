import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

export default function SMSVerificationScreen({goBack} : any) {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '','','']);

    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newCode = [...verificationCode];
            newCode[index] = value;
            setVerificationCode(newCode);

            // Move to next input if value is entered and not the last input
            if (value.length === 1 && index < 5) {
                (refs[index + 1] as any).focus();
            }
        }
    };

    const handleSubmit = async () => {
        const code = verificationCode.join('');
        console.log('Submitting code:', code);

        if (!code) {
            console.error('Verification code is empty');
            return;
        }
        // ...
    };

    const refs = [
        React.createRef<TextInput>(),
        React.createRef<TextInput>(),
        React.createRef<TextInput>(),
        React.createRef<TextInput>(),
        React.createRef<TextInput>(),
        React.createRef<TextInput>(),
    ];

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <ArrowLeft color="#5E83C0" size={24} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.title}>Verify Your Number</Text>
                <Text style={styles.subtitle}>Enter the 6-digit code sent to your phone</Text>
                <View style={styles.codeContainer}>
                    {verificationCode.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.codeInput}
                            value={digit}
                            onChangeText={(value) => handleCodeChange(index, value)}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={refs[index]}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Verify</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5E83C0',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#8DACD2',
        marginBottom: 30,
        textAlign: 'center',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 30,
    },
    codeInput: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: '#8DACD2',
        borderRadius: 10,
        fontSize: 24,
        textAlign: 'center',
        color: '#5E83C0',
    },
    submitButton: {
        backgroundColor: '#5E83C0',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});