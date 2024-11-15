import React from 'react'
import { View, Image, StyleSheet, SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function Logo() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('./../../assets/images/Logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

            </SafeAreaView>
        </SafeAreaProvider>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logoContainer: {
        alignItems: 'center',
        marginHorizontal: 30,
    },
    logo: {
        width: 100,
        height: 90,
    },
})