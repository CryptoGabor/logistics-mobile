import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Events, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {AuthenticationService} from "../../../services/restAPI/authentication.service";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/restAPI/user.service";

@IonicPage()
@Component({
    selector: 'page-account-verification-address',
    templateUrl: './account-verification-address.html',
})
export class AccountVerificationAddressPage {

    profile;
    uploadForm: FormGroup;
    ProofOfresidenceImageSrc: any;

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
                nullProofOfresidence: new FormControl('', [Validators.required]),
                invalidProofOfresidence: new FormControl('', []),
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
                    this.ProofOfresidenceImageSrc = response.profile.ProofOfresidenceImage;
                }
            });
    }

    upload({value, valid}: { value: FormGroup, valid: boolean }) {
        if (!this.ProofOfresidenceImageSrc) {
            this.uploadForm.controls['nullProofOfresidence'].setErrors({
                backend: {nullProofOfresidence: "Please select a Proof Of Residence Image"}
            });
        } else {
            this.uploadForm.controls['nullProofOfresidence'].setErrors(null);
            this.uploadForm.controls['invalidProofOfresidence'].setErrors(null);
        }
        if (this.ProofOfresidenceImageSrc && valid) {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.userService
                .uploadProofOfresidenceImage(this.ProofOfresidenceImageSrc)
                .then(response => {
                    loading.dismiss();
                    alert("Upload success");
                })
                .catch(error => {
                    loading.dismiss();
                    console.log(error);
                    this.uploadForm.controls['invalidProofOfresidence'].setErrors({
                        backend: {
                            invalidProofOfresidence: "Error on uploading Proof Of Residence Image, please select a valid image for upload and retry"
                        }
                    });
                })

        }
    }

    getProofOfAddress() {
        this.camera.getPicture(this.opt).then((imageData) => {
            this.ProofOfresidenceImageSrc = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData);
            this.uploadForm.controls['nullProofOfresidence'].setErrors(null);
            this.uploadForm.controls['invalidProofOfresidence'].setErrors(null);
            this.events.publish("pic:loaded", this.ProofOfresidenceImageSrc);
        }, (err) => {
            this.ProofOfresidenceImageSrc = null;
        });
    }
}
