export class LatLng {

    lat: number;
    lng: number;

    static radians(degrees) {
        return degrees * Math.PI / 180;
    };

    static distanceInKm(origin: LatLng, dest: LatLng): number {
        let earthRadius: number = 6371000; //meters
        let dLat = LatLng.radians(dest.lat - origin.lat);
        let dLng = LatLng.radians(dest.lng - origin.lng);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(LatLng.radians(origin.lat)) * Math.cos(LatLng.radians(dest.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let dist = earthRadius * c;
        return dist / 1000;
    }

}

export class LatLngRange {

    origin: LatLng;
    latDelta: number;
    lngDelta: number;

    constructor(origin, latDelta, lngDelta) {
        this.origin = origin;
        this.latDelta = latDelta;
        this.lngDelta = lngDelta;
    }

    getLatPlusRange() {
        return this.origin.lat + this.latDelta;
    }

    getLatMinusRange() {
        return this.origin.lat - this.latDelta;
    }

    getLngPlusRange() {
        return this.origin.lng + this.lngDelta;
    }

    getLngMinusRange() {
        return this.origin.lng - this.lngDelta;
    }
}


export class CoordinateRangeConverter {

    private static LAT_CONV_RATE = 110.574;
    private static LNG_CONV_RATE = 111.320;

    static toCoordinateDelta(origin: LatLng, km: number): LatLngRange {
        let lat = 1 / CoordinateRangeConverter.LAT_CONV_RATE * km;
        let lng = 1 / CoordinateRangeConverter.LNG_CONV_RATE * Math.cos(lat) * km;
        return new LatLngRange(origin, lat, lng);
    }
}