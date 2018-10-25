import { Component } from '@angular/core';
import { Events } from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the PicCaptureComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pic-capture',
  templateUrl: 'pic-capture.html'
})
export class PicCaptureComponent {
  test: boolean = true;  
  image: string;
  opt: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private camera: Camera, private events: Events) {}

  getImage(){
    this.camera.getPicture(this.opt).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.events.publish("pic:loaded", this.image);
     }, (err) => { alert("si è verificato un errore durante il caricamento della foto") });
  }
}
