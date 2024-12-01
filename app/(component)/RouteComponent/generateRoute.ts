import {calculateDistance} from "@/app/(component)/RouteComponent/calculateDistance";
import {Region} from "react-native-maps";
import {Park, TransformedParcData} from "@/app/(component)/RouteComponent/transformedParcData";

interface RoutePoint extends Region {
    name?: string;
    distance?: number;
}

export const GenerateRoundTrip = (startLocation: Region, targetSteps: number, height : number): RoutePoint[] => {
    const strideLength = height * 0.414;
    let remainingDistance = (targetSteps * strideLength) / 1000;

    const route: RoutePoint[] = [startLocation];

    const visitedParks: Set<string> = new Set();

    while (remainingDistance > 0) {
        const lastLocation = route[route.length - 1];
        const nextPark = TransformedParcData
            .filter((park: Park) => !visitedParks.has(park.name))
            .map((park: Park) => ({
                ...park,
                distance: calculateDistance(
                    lastLocation.latitude,
                    lastLocation.longitude,
                    park.center.latitude,
                    park.center.longitude
                ),
            }))
            .sort((a, b) => a.distance - b.distance)[0];

        if (!nextPark || nextPark.distance * 2 > remainingDistance) {
            // If no suitable park found, add a random point within the remaining distance
            const randomAngle = Math.random() * 2 * Math.PI;
            const randomDistance = Math.random() * Math.min(remainingDistance / 2, 1); // Max 1km or half remaining distance
            const newPoint: RoutePoint = {
                latitude: lastLocation.latitude + randomDistance * Math.cos(randomAngle) / 111.32,
                longitude: lastLocation.longitude + randomDistance * Math.sin(randomAngle) / (111.32 * Math.cos(lastLocation.latitude * (Math.PI / 180))),
                latitudeDelta: lastLocation.latitudeDelta,
                longitudeDelta: lastLocation.longitudeDelta,
                name: `Random Point ${route.length}`,
                distance: randomDistance
            };
            route.push(newPoint);
            remainingDistance -= randomDistance * 2;
        } else {
            const routePoint: RoutePoint = {
                ...nextPark.center,
                latitudeDelta: lastLocation.latitudeDelta,
                longitudeDelta: lastLocation.longitudeDelta,
                name: nextPark.name,
                distance: nextPark.distance
            };
            route.push(routePoint);
            visitedParks.add(nextPark.name);
            remainingDistance -= nextPark.distance * 2;
        }

        // Add some randomness to avoid perfectly straight lines
        if (Math.random() < 0.3) {
            const detourDistance = Math.random() * 0.2; // Max 200m detour
            const detourAngle = Math.random() * 2 * Math.PI;
            const detourPoint: RoutePoint = {
                latitude: lastLocation.latitude + detourDistance * Math.cos(detourAngle) / 111.32,
                longitude: lastLocation.longitude + detourDistance * Math.sin(detourAngle) / (111.32 * Math.cos(lastLocation.latitude * (Math.PI / 180))),
                latitudeDelta: lastLocation.latitudeDelta,
                longitudeDelta: lastLocation.longitudeDelta,
                name: `Detour ${route.length}`,
                distance: detourDistance
            };
            route.push(detourPoint);
            remainingDistance -= detourDistance * 2;
        }
    }

    // Return to the starting point
    route.push({...startLocation, name: "End Point", distance: calculateDistance(
            route[route.length - 1].latitude,
            route[route.length - 1].longitude,
            startLocation.latitude,
            startLocation.longitude
        )});


    console.log(route);
    console.log(remainingDistance)
    return route;
};

