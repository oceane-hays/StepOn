import {data} from "@/data/espace_vert";
import {CalculateCenterParc} from "@/app/(component)/RouteComponent/calculateCenterParc";


export const TransformedParcData = data.features.map(feature => {
    const coordinates = feature.geometry.coordinates[0]; // Premier anneau du polygone

    const center = CalculateCenterParc(coordinates);
    return {
        name: feature.properties?.OBJECTID || "Unknown Park", // Utilise une propriété si disponible
        center,
    };
});
