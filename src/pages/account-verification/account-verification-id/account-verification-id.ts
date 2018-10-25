import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Events, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {AuthenticationService} from "../../../services/restAPI/authentication.service";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/restAPI/user.service";

@IonicPage()
@Component({
    selector: 'page-account-verification-id',
    templateUrl: './account-verification-id.html',
})
export class AccountVerificationIdPage {

    profile;

    uploadForm: FormGroup;
    IDDocFrontImageSrc: any;
    IDDocBackImageSrc: any;

    opt: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
        mediaType: this.camera.MediaType.PICTURE
    };

    constructor(public navCtrl: NavController,
                public authenticationService: AuthenticationService,
                public userService: UserService,
                public loadingCtrl: LoadingController,
                private sanitizer: DomSanitizer,
                private camera: Camera,
                private events: Events) {

        this.uploadForm = new FormGroup({
                idType: new FormControl('', [Validators.required]),
                nullFront: new FormControl('', [Validators.required]),
                nullBack: new FormControl('', [Validators.required]),
                invalidFront: new FormControl('', []),
                invalidBack: new FormControl('', []),

            },
            {updateOn: 'submit'}
        )
    }

    ionViewDidEnter() {
        this.userService
            .getUserProfile()
            .then((response: any) => {
                if (response.success && response.profile) {
                    this.profile = response.profile;
                    this.IDDocFrontImageSrc = response.profile.IDDocFrontImage;
                    this.IDDocBackImageSrc = response.profile.IDDocBackImage;
                }
            });
    }

    upload({value, valid}: { value: FormGroup, valid: boolean }) {
        if (!this.IDDocFrontImageSrc) {
            this.uploadForm.controls['nullFront'].setErrors({
                backend: {nullFront: "Please select a Front Image"}
            });
        } else {
            this.uploadForm.controls['nullFront'].setErrors(null);
            this.uploadForm.controls['invalidFront'].setErrors(null);
        }
        if (!this.IDDocBackImageSrc) {
            this.uploadForm.controls['nullBack'].setErrors({
                backend: {nullBack: "Please select a Back Image"}
            });
        } else {
            this.uploadForm.controls['nullBack'].setErrors(null);
            this.uploadForm.controls['invalidBack'].setErrors(null);
        }
        if (this.IDDocFrontImageSrc && this.IDDocBackImageSrc && valid) {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.userService
                .uploadIDDocFrontImage(this.IDDocFrontImageSrc)
                .then(response => {

                    this.userService
                        .uploadIDDocBackImage(this.IDDocBackImageSrc)
                        .then(response => {
                            loading.dismiss();
                            alert("Upload success");
                        })
                        .catch(error => {
                            loading.dismiss();
                            this.uploadForm.controls['invalidBack'].setErrors({
                                backend: {invalidBack: "Error on uploading Back Image, please select a valid image for upload and retry"}
                            });
                            console.log(error);
                        })

                })
                .catch(error => {
                    loading.dismiss();
                    console.log(error);
                    this.uploadForm.controls['invalidFront'].setErrors({
                        backend: {invalidFront: "Error on uploading Front Image, please select a valid image for upload and retry"}
                    });
                })

        }
    }

    getFrontId() {
        this.camera.getPicture(this.opt).then((imageData) => {
            this.IDDocFrontImageSrc = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData);
            this.uploadForm.controls['nullFront'].setErrors(null);
            this.uploadForm.controls['invalidFront'].setErrors(null);
            this.events.publish("pic:loaded", this.IDDocFrontImageSrc);
        }, (err) => {
            this.IDDocFrontImageSrc = null;
        });
    }

    getBackId() {
        this.camera.getPicture(this.opt).then((imageData) => {
            this.IDDocBackImageSrc = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData);
            this.uploadForm.controls['nullBack'].setErrors(null);
            this.uploadForm.controls['invalidBack'].setErrors(null);
            this.events.publish("pic:loaded", this.IDDocBackImageSrc);
        }, (err) => {
            this.IDDocBackImageSrc = null;
        });
    }
}
