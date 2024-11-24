import React from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import Weather from "@/app/(component)/weather";

export default function DayInfos(setLocation : any) {
    return (
        <View style={styles.container}>
            <Weather weather={'Rain'} temperature={23} />
            <ImageBackground
                source={require('./../../assets/images/sky.png')}
                style={styles.background}
                imageStyle={styles.image}
            >
                <View style={styles.content}>
                    <Text style={{color : '#fff', fontSize : 25, fontWeight: 'bold'}}>Montreal, </Text>
                    <Text style={{color : '#fff', fontSize : 20}}>
                        Canada
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        marginTop: 70,
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden', // This is crucial to apply the borderRadius
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
    },
    background: {
        flex: 1,
    },
    image: {
        borderRadius: 20, // This applies the border radius to the image itself
    },
    content: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255, 0.5)', // Example of a translucent overlay
        alignItems: 'center',
        paddingVertical : 20,
    },
});