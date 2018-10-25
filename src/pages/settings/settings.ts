import {IonicPage, LoadingController, NavController, Platform, ToastController} from "ionic-angular";
import {Component} from "@angular/core";
import {Geolocation} from "@ionic-native/geolocation";
import {UserService} from "../../services/restAPI/user.service";
import {AuthenticationService} from "../../services/restAPI/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CourierService} from "../../services/restAPI/courier.service";
import {FormValidators} from "../../utils/FormValidators";

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    courier: any;
    settingsForm: FormGroup;

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                private geolocation: Geolocation,
                private platform: Platform,
                private authenticationService: AuthenticationService,
                private courierService: CourierService,
                private userService: UserService) {
    }

    ionViewCanEnter() {
        return this.authenticationService.isLoggedIn();
    }

    ionViewDidEnter() {
        this.init();
    }

    getCurrentAddress(formControlName) {
        this.platform.ready().then(() => {
            this.geolocation.getCurrentPosition()
                .then((position: any) => {
                    console.log(position);
                    let geocoder = new google.maps.Geocoder;
                    geocoder.geocode({
                            'location': {
                                lat: position.coords.latitude, lng: position.coords.longitude
                            }
                        },
                        (results, status) => {
                            console.log(results, status);
                            if (status.toString() == "OK"
                                && results.length > 0) {
                                this.updateLocation(results[0]);
                            }
                        });
                }).catch((error) => {
                console.log(error, JSON.stringify(error, Object.getOwnPropertyNames(error)));
            });
        }).catch(err => {
            console.log("DOM Ready issues");
        });
    }

    updateLocation(location) {
        let city = location.address_components
            .find(address => address.types
                .find(type => type === 'locality') != null);
        if (city) {
            this.settingsForm.get('pickUpLocationCity').setValue(city.short_name);
        }
        this.settingsForm.get('pickUpLocationAddress').setValue(location.formatted_address);
        this.settingsForm.get('pickUpLocationLat').setValue(location.geometry.location.lat());
        this.settingsForm.get('pickUpLocationLng').setValue(location.geometry.location.lng());
    }

    createOrUpdateSettings({value, valid}: { value: any, valid: boolean }) {
        let loading = this.loadingCtrl.create();
        loading.present();
        FormValidators.validateAllFormFields(this.settingsForm);
        if (valid) {
            if (this.courier) {
                this.courierService
                    .editCourier(value)
                    .subscribe((response: any) => {
                            loading.dismiss();
                            if (response.success) {
                                this.courier = response.courier;
                            }
                            let tooltip = this.toastCtrl.create({
                                message: response.success ? 'Settings saved!' : 'Unable to save Settings',
                                showCloseButton: true,
                                closeButtonText: 'X',
                                position: 'bottom',
                                cssClass: 'tooltip',
                                dismissOnPageChange: true
                            });
                            tooltip.present();
                        },
                        error => {
                            console.log(error);
                            loading.dismiss();
                        });
            } else {
                this.courierService
                    .createCourier(value)
                    .subscribe((response: any) => {
                        loading.dismiss();
                        if (response.success) {
                            this.courierService
                                .getCourierByProfile()
                                .subscribe((response: any) => {
                                    if (response.success && response.courier) {
                                        this.courier = response.courier;
                                    }
                                    let tooltip = this.toastCtrl.create({
                                        message: response.success ? 'Settings saved!' : 'Unable to save Settings',
                                        showCloseButton: true,
                                        closeButtonText: 'X',
                                        position: 'bottom',
                                        cssClass: 'tooltip',
                                        dismissOnPageChange: true
                                    });
                                    tooltip.present();
                                });
                            alert("Save successful");
                        }
                    }, error => {
                        console.log(error);
                        loading.dismiss();
                    });
            }
        }
    }


    private init() {
        this.courierService
            .getCourierByProfile()
            .subscribe((response: any) => {
                if (response.success
                    && response.courier) {
                    this.courier = response.courier;
                }
                this.initSettingsForm();
            });
    }


    private initSettingsForm() {
        this.settingsForm = new FormGroup({
                id: new FormControl(this.courier ? this.courier.id : null),
                pickUpLocationCity: new FormControl(
                    this.courier ? this.courier.pickUpLocationCity : '',
                    [Validators.required]
                ),
                pickUpLocationAddress: new FormControl(
                    this.courier ? this.courier.pickUpLocationAddress : '',
                    [Validators.required]
                ),
                pickUpLocationLat: new FormControl(
                    this.courier ? this.courier.pickUpLocationLat : '',
                    [Validators.required]
                ),
                pickUpLocationLng: new FormControl(
                    this.courier ? this.courier.pickUpLocationLng : '',
                    [Validators.required]
                ),
                priceRange10Km: new FormControl(
                    this.courier ? this.courier.priceRange10Km : 0,
                    [Validators.required]
                ),
                priceRange20Km: new FormControl(
                    this.courier ? this.courier.priceRange20Km : 0,
                    [Validators.required]
                ),
                priceRange50Km: new FormControl(
                    this.courier ? this.courier.priceRange50Km : 0,
                    [Validators.required]
                ),
                priceRangeMore50Km: new FormControl(
                    this.courier ? this.courier.priceRangeMore50Km : 0,
                    [Validators.required]
                ),
            },
            {
                updateOn: 'submit',
                validators: FormValidators.priceRangeValidator
            }
        );
    }


}
