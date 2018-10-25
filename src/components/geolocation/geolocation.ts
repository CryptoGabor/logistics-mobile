import {Component, ElementRef, ViewChild} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

declare var google;

/**
 * Generated class for the GeolocationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'geolocation',
    templateUrl: 'geolocation.html'
})


export class GeolocationComponent {
    test: boolean = true;
    inputPosition: string;
    map: any;
    coordinates: coordinates;

    @ViewChild('map') mapElement: ElementRef;

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    constructor(private geolocation: Geolocation,
                private platform: Platform) {

    }

    getPosition() {

        this.platform.ready().then(() => {
            // TODO
            // check inputPosition for text search
            this.geolocation.getCurrentPosition().then((position) => {
                this.setMap(position);
            }).catch((error) => {
                console.log(error, JSON.stringify(error, Object.getOwnPropertyNames(error)));
            });
        }).catch(err => {
            console.log("DOM Ready issues");
        });
    }

    setMap(position) {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 17,
            center: {lat: position.coords.latitude, lng: position.coords.longitude}
        });

        var marker = new google.maps.Marker({
            position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            map: this.map,
            title: 'Your Location',
            animation: 'DROP',
        });

        marker.setMap(this.map);
        this.directionsDisplay.setMap(this.map);
    }
}

interface coordinates {
    latitude: number;
    longitude: number;
}
