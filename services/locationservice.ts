import Geolocation from "@react-native-community/geolocation";

export const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position : any) => {
                const cords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    heading: position?.coords?.heading,
                };
                resolve(cords);
            },
            (error:any) => {
                reject(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    });