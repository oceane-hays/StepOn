import React from 'react'
import { View, Image, StyleSheet, SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function Logo() {
    return (
        <View style={styles.logoContainer}>
            <Image
                source={require('./../../assets/images/Logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>


    )
}

const styles = StyleSheet.create({
    logoContainer: {
        backgroundColor: '#fff',
        width: '100%',
        height: '15%'
    },
    logo: {
        flex: 1,
        width: null,
        paddingVertical: 20,
    },
})