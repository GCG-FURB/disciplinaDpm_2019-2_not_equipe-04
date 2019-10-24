import { Component, OnInit } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.page.html',
  styleUrls: ['./aluno.page.scss'],
})
export class AlunoPage implements OnInit {
  public image = '';
  public itemName = 'Carro zero';

  constructor(
    private qrScanner: QRScanner,
    private router: Router,
    private alertController: AlertController,
    private androidPermissions: AndroidPermissions
  ) { }

  ngOnInit() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log('aqu ');
          this.qrScanner.show();

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  ionViewWillEnter() {

  }

  private qrCode() {
    const scanSub = this.qrScanner
      .scan()
      .subscribe(async (id: string) => {
        scanSub.unsubscribe();
        await this.onQrCode(id);
      });
  }

  private async onQrCode(id) {
    // enviar para o backend
  }

  public close() {
    this.image = '';
  }

  public goToCart() {
    this.router.navigate(['/cart'])
  }

  public async question() {
    // requisitar a pergunta
    const alert = await this.alertController.create({
      header: 'Responda',
      message: "",
      inputs: [
        {
          name: 'response',
          type: 'text',
          placeholder: 'Responda...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: 'Ok',
          handler: (event) => {
            if (event.response == 10) {
              alert.dismiss();
            } else {
              alert.dismiss();
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
