import { Component } from '@angular/core';
import { Events } from "ionic-angular";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the QrReaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qr-reader',
  templateUrl: 'qr-reader.html'
})
export class QrReaderComponent {
  qrcode: string;
  test: boolean = true;

  constructor(private barcodeScanner: BarcodeScanner, private events: Events) {
  }

  getQRCode(){
    this.barcodeScanner.scan().then(data=>{
      this.setQRCode(data.text);
      this.events.publish("qr:read", data.text);
    }).catch(err=>{
      alert("Si è verificato un errore nella lettura del QR Code\n\r" + err);
    });
  }

  setQRCode(data){
    this.qrcode = data;
  }

}
