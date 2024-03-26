export interface Place {
    id: string
    name: string
    description?: string
    coordinates: Coordinates
}

export interface Coordinates {
    lat: number
    lng: number
}