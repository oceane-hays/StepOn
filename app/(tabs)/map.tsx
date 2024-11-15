import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView , {PROVIDER_GOOGLE}  from "react-native-maps";
import GetLocation from 'react-native-get-location'


const defaultLocation = {
    latitude: 45.5017,  // Coordonnées de Montréal
    longitude: -73.5673,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
})

    .then(location => {
        console.log(location);
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex : 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});


export default function GoogleMapScreen(){
    // const [permissionGranter, setPermissionGranter] = React.useState(false);
    //
    // useEffect(() => {
    //     _getLocationPermission();
    // }, [])
    //
    // async function getLocationPermission(){
    //
    // }
    //
    // if (!permissionGranter) return <View><Text>Veuillez acceptez l'accès à votre localisation</Text></View>

    const [location, setLocation] = useState(defaultLocation);

    useEffect(() => {
        // Tente d'obtenir la position actuelle
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then((location) => {
                // Si la localisation est obtenue, mets-la à jour
                setLocation({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            })
            .catch((error) => {
                const { code, message } = error;
                console.warn(code, message);  // Gérer les erreurs si la localisation échoue
            });
    }, []);

    return (
        <View style={styles.container}>
        <MapView provider={MapView.PROVIDER_GOOGLE}
    style={styles.map}
    region={location}/>
    </View>
)
};

