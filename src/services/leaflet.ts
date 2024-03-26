import { Coordinates } from "@/types/Map";
import { LatLngTuple } from "leaflet";

export const toLatLng = (coordinates: Coordinates): LatLngTuple => {
    return [coordinates.lat, coordinates.lng]
}