import {ChangeDetectorRef, Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, Platform} from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/restAPI/user.service";
import moment from 'moment';
import {CourierService} from "../../services/restAPI/courier.service";
import {CoordinateRangeConverter} from "../../utils/CoordinateRangeConverter";
import {ENV} from "@app/env";
import {FormValidators} from "../../utils/FormValidators";


@IonicPage()
@Component({
    selector: 'page-new-order',
    templateUrl: 'new-order.html'
})
export class NewOrderPage {

    newOrderForm: FormGroup;
    isYou = true;
    profile: any;
    wallet: any;
    couriers = [];
    couriersFiltered = [];
    distance = 0;
    priceRangeKm = 'priceRange10Km';
    couriersFound = 0;
    highestPrice = 0;
    priceRangeMin = 0;
    priceRangeMax = 0;


    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                private geolocation: Geolocation,
                private platform: Platform,
                private userService: UserService,
                private changeDetectorRef: ChangeDetectorRef,
                private courierService: CourierService) {
        this.initNewOrderForm();
    }


    ionViewDidEnter() {
        this.initProfile();
        this.initNewOrderForm();
    }

    createNewOrder({value, valid}: { value: any, valid: boolean }) {
        FormValidators.validateAllFormFields(this.newOrderForm);
        if (valid && this.couriers.length > 0) {
            delete value.agreement;
            this.navCtrl.push(
                'NewOrderPaymentPage',
                {
                    order: value
                });
        }
    }

    updateLocation(location, formControlName) {
        let city = location.address_components
            .find(address => address.types
                .find(type => type === "locality") != null);
        if (city) {
            this.newOrderForm.get(`${formControlName}City`).setValue(city.short_name);
        }
        this.newOrderForm.get(`${formControlName}Address`).setValue(location.formatted_address);
        this.newOrderForm.get(`${formControlName}Lat`).setValue(location.geometry.location.lat());
        this.newOrderForm.get(`${formControlName}Lng`).setValue(location.geometry.location.lng());
        this.searchCouriers();
    }

    getCurrentAddress(formControlName) {
        this.isYou = formControlName == "locationFrom";
        this.platform.ready().then(() => {
            this.geolocation.getCurrentPosition()
                .then((position: any) => {
                    let geocoder = new google.maps.Geocoder;
                    geocoder.geocode({
                            'location': {
                                lat: position.coords.latitude, lng: position.coords.longitude
                            }
                        },
                        (results, status) => {
                            if (status.toString() == "OK"
                                && results.length > 0) {
                                this.updateLocation(results[0], formControlName);
                            }
                        });
                }).catch((error) => {
                console.log(error, JSON.stringify(error, Object.getOwnPropertyNames(error)));
            });
        }).catch(err => {
            console.log("DOM Ready issues");
        });
    }

    searchCouriers() {
        let loading = this.loadingCtrl.create();
        loading.present();
        let latLngDelta = CoordinateRangeConverter.toCoordinateDelta({
            lat: this.newOrderForm.get('locationFromLat').value,
            lng: this.newOrderForm.get('locationFromLng').value
        }, ENV.courierSearchRangeInKm);
        this.courierService
            .searchCourier({
                priceRange: this.newOrderForm.get('priceRange').value,
                locationFromLat: this.newOrderForm.get('locationFromLat').value,
                locationFromLng: this.newOrderForm.get('locationFromLng').value,
                locationToLat: this.newOrderForm.get('locationToLat').value,
                locationToLng: this.newOrderForm.get('locationToLng').value,
                latDelta: latLngDelta.latDelta,
                lngDelta: latLngDelta.lngDelta,
            })
            .subscribe((response: any) => {
                loading.dismiss();
                if (response.success) {
                    this.distance = response.distance;
                    this.couriers = response.couriers;
                    this.couriersFiltered = response.couriers;
                    this.updatePriceRange();
                    this.couriersFound = response.couriersFound;
                    this.changeDetectorRef.detectChanges();
                } else {
                    this.distance = 0;
                    this.couriers = [];
                    this.couriersFiltered = [];
                    this.updatePriceRange();
                    this.couriersFound = 0;
                    this.changeDetectorRef.detectChanges();
                }
            }, error => {
                loading.dismiss();
                console.log(error);
            });
    }

    filterCouriers() {
        this.couriersFiltered = this.couriers
            .filter(courier => courier[this.priceRangeKm] * this.distance <= this.newOrderForm.get("priceRange").value);
        this.couriersFound = this.couriersFiltered.length;
        this.highestPrice = Math.max.apply(Math, this.getCourierPrices());
    }

    setUrgent() {
        let urgentOrder = moment().format('HH:mm');

        let urgentOrderPickupTo = moment().add(30, 'm').format('HH:mm');
        let urgentOrderDeliveryFrom = moment().add(60, 'm').format('HH:mm');
        let urgentOrderDeliveryTo = moment().add(90, 'm').format('HH:mm');

        this.newOrderForm.get('pickupFrom').setValue(urgentOrder);
        this.newOrderForm.get('pickupTo').setValue(urgentOrderPickupTo);
        this.newOrderForm.get('deliveryFrom').setValue(urgentOrderDeliveryFrom);
        this.newOrderForm.get('deliveryTo').setValue(urgentOrderDeliveryTo);
        this.newOrderForm.get('isUrgent').setValue(true);
    }

    setUserName(controlName = 'sender') {
        this.newOrderForm
            .get(controlName)
            .setValue(`${this.profile.user.first_name} ${this.profile.user.last_name}`)
    }

    private getCourierPrices() {
        this.updatePriceRangeField();
        return this.couriersFiltered
            .map(courier => {
                console.log(courier[this.priceRangeKm],
                    this.distance,
                    (courier[this.priceRangeKm] * this.distance).toFixed(2)
                );
                return (courier[this.priceRangeKm] * this.distance).toFixed(2);
            });
    }

    private updatePriceRangeField() {
        this.priceRangeKm = 'priceRange10Km';
        if (this.distance > 10) {
            this.priceRangeKm = 'priceRange20Km';
        }
        if (this.distance > 20) {
            this.priceRangeKm = 'priceRange50Km';
        }
        if (this.distance > 50) {
            this.priceRangeKm = 'priceRangeMore50Km';
        }
    }

    private initNewOrderForm() {
        this.newOrderForm = new FormGroup({
                sender: new FormControl('', [Validators.required]),
                locationFromCity: new FormControl('', [Validators.required]),
                locationFromAddress: new FormControl('', [Validators.required]),
                locationFromLat: new FormControl('', [Validators.required]),
                locationFromLng: new FormControl('', [Validators.required]),
                receiver: new FormControl('', [Validators.required]),
                locationToCity: new FormControl('', [Validators.required]),
                locationToAddress: new FormControl('', [Validators.required]),
                locationToLat: new FormControl('', [Validators.required]),
                locationToLng: new FormControl('', [Validators.required]),
                pickupFrom: new FormControl('', [Validators.required]),
                pickupTo: new FormControl('', [Validators.required]),
                deliveryFrom: new FormControl('', [Validators.required]),
                deliveryTo: new FormControl('', [Validators.required]),
                isUrgent: new FormControl(false),
                numberOfSmallBoxes: new FormControl(0,),
                numberOfMediumBoxes: new FormControl(0,),
                numberOfLargeBoxes: new FormControl(0,),
                priceRange: new FormControl(0, [Validators.required]),
                agreement: new FormControl(false, [Validators.requiredTrue]),
            },
            {
                updateOn: 'submit',
                validators: [FormValidators.boxesValidator, FormValidators.timeSlotsValidator,]
            }
        );
        this.priceRangeMin = 0;
        this.priceRangeMax = 0;
    }

    private updatePriceRange() {
        let prices = this.getCourierPrices();
        this.priceRangeMin = prices.length > 0 ? Math.min.apply(Math, prices) : 0;
        this.priceRangeMax = prices.length > 0 ? Math.max.apply(Math, prices) + 2 : 0;
        this.newOrderForm.get('priceRange').setValue(this.priceRangeMin);
        this.highestPrice = this.priceRangeMax;
    }

    private initProfile() {
        this.userService
            .getUserProfile()
            .then((response: any) => {
                if (response.success && response.profile) {
                    this.profile = response.profile;
                    this.wallet = response.wallet;
                }
            });
    }
}
