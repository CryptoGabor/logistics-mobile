import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Events, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {AuthenticationService} from "../../../services/restAPI/authentication.service";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/restAPI/user.service";

@IonicPage()
@Component({
    selector: 'page-account-verification-selfie',
    templateUrl: './account-verification-selfie.html',
})
export class AccountVerificationSelfiePage {

    profile;
    uploadForm: FormGroup;
    SelfIDocImageSrc: any;
    textCode: number;

    opt: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
        mediaType: this.camera.MediaType.PICTURE
    };

    private getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    constructor(public navCtrl: NavController,
                public authenticationService: AuthenticationService,
                private userService: UserService,
                public loadingCtrl: LoadingController,
                private sanitizer: DomSanitizer,
                private camera: Camera,
                private events: Events) {

        this.uploadForm = new FormGroup({
                nullSelfIDoc: new FormControl('', [Validators.required]),
                invalidSelfIDoc: new FormControl('', []),
            },
            {updateOn: 'submit'}
        );
        this.textCode = this.getRandomIntInclusive(100, 999);
    }

    ionViewDidEnter() {
        this.userService
            .getUserProfile()
            .then((response: any) => {
                if (response.success && response.profile) {
                    this.profile = response.profile;
                    this.SelfIDocImageSrc = response.profile.SelfIDocImage;
                }
            });
    }

    upload({value, valid}: { value: FormGroup, valid: boolean }) {
        if (!this.SelfIDocImageSrc) {
            this.uploadForm.controls['nullSelfIDoc'].setErrors({
                backend: {nullSelfIDoc: "Please select a Self IDoc Image"}
            });
        } else {
            this.uploadForm.controls['nullSelfIDoc'].setErrors(null);
            this.uploadForm.controls['invalidSelfIDoc'].setErrors(null);
        }
        if (this.SelfIDocImageSrc && valid) {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.userService
                .uploadSelfIDocImage(this.SelfIDocImageSrc)
                .then(response => {
                    loading.dismiss();
                    alert("Upload success");
                })
                .catch(error => {
                    loading.dismiss();
                    console.log(error);
                    this.uploadForm.controls['invalidSelfIDoc'].setErrors({
                        backend: {invalidSelfIDoc: "Error on uploading Self IDoc Image, please select a valid image for upload and retry"}
                    });
                })
        }
    }

    getSelfie() {
        this.camera.getPicture(this.opt).then((imageData) => {
            this.SelfIDocImageSrc = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData);
            this.uploadForm.controls['nullSelfIDoc'].setErrors(null);
            this.uploadForm.controls['invalidSelfIDoc'].setErrors(null);
            this.events.publish("pic:loaded", this.SelfIDocImageSrc);
        }, (err) => {
            this.SelfIDocImageSrc = null;
        });
    }
}
