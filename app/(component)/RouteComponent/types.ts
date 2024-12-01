export interface RoutePoint {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
    center?: {
        latitude: number;
        longitude: number;
    };
    distance?: number;
    name?: string;
}

export interface Destination {
    latitude: number;
    longitude: number;
}