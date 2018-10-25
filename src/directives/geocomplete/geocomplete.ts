import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {MapsAPILoader} from "@agm/core";


@Directive({
    selector: '[geocomplete]',
})
export class GeocompleteDirective {

    @Output() onPlaceSelected = new EventEmitter();

    constructor(private geolocation: Geolocation,
                private mapsAPILoader: MapsAPILoader,
                private platform: Platform,
                private searchElement: ElementRef) {

        this.platform
            .ready()
            .then(() => {
                this.mapsAPILoader.load().then(() => {
                    let autocomplete = new google.maps.places.Autocomplete(
                        this.searchElement.nativeElement,
                        {
                            types: ["address"]
                        });
                    autocomplete.addListener("place_changed", () => {
                        //get the place result
                        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                        //verify result
                        if (place.geometry === undefined || place.geometry === null) {
                            return;
                        }
                        this.onPlaceSelected.emit(place);
                    })
                });
            })
            .catch(error => console.log(error));
    }

}