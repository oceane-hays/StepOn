import {calculateDistance} from "@/app/(component)/RouteComponent/calculateDistance";
import {Region} from "react-native-maps";
import {TransformedParcData} from "@/app/(component)/RouteComponent/transformedParcData";

export const GenerateRoundTrip = (startLocation : Region, targetDistance : number) => {
    let remainingDistance = targetDistance;
    const route = [startLocation]; // Itinéraire commençant au point de départ

    while (remainingDistance > 0) {
        // Trouver le parc le plus proche non visité
        const lastLocation = route[route.length - 1];
        const nextPark = TransformedParcData
            .filter((park : any) => !route.includes(park.center))
            .map((park : any) => ({
                ...park,
                distance: calculateDistance(
                    lastLocation.latitude,
                    lastLocation.longitude,
                    park.center.latitude,
                    park.center.longitude
                ),
            }))
            .sort((a : any, b : any) => a.distance - b.distance)[0];

        if (!nextPark || nextPark.distance * 2 > remainingDistance) break; // Arrêter si plus de parcs possibles

        // Ajouter le parc à l'itinéraire
        route.push(nextPark);
        remainingDistance -= nextPark.distance * 2; // Distance aller-retour
    }

    // Retour au point de départ
    route.push(startLocation);

    console.log(route)
    return route;
};
