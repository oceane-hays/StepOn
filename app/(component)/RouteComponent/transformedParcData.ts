import { Feature, Geometry } from 'geojson';
import { data } from "@/data/espace_vert";
import { CalculateCenterParc } from "@/app/(component)/RouteComponent/calculateCenterParc";

export interface Park {
    name: string;
    center: {
        latitude: number;
        longitude: number;
    };
}

export const TransformedParcData: Park[] = data.features.map((feature: any) => {
    if (feature.geometry.type !== 'Polygon') {
        console.warn(`Unexpected geometry type for feature: ${feature.properties?.OBJECTID}`);
        return null;
    }

    const coordinates = feature.geometry.coordinates[0]; // First ring of the polygon

    if (!coordinates || coordinates.length === 0) {
        console.warn(`No coordinates found for feature: ${feature.properties?.OBJECTID}`);
        return null;
    }

    const center = CalculateCenterParc(coordinates);

    return {
        name: feature.properties?.OBJECTID?.toString() || "Unknown Park",
        center,
    };
}).filter((park): park is Park => park !== null);

console.log(`Transformed ${TransformedParcData.length} parks`);