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

  public teste = false;

  constructor(
    private qrScanner: QRScanner,
    private router: Router,
    private alertController: AlertController,
    private androidPermissions: AndroidPermissions
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.teste = true;
    }, 3000);
  }

  ionViewWillEnter() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qrScanner.hide();
            scanSub.unsubscribe();
          });

        } else if (status.denied) {
          this.androidPermissions.requestPermissions(
            [
              this.androidPermissions.PERMISSION.CAMERA
            ]
          );
        } else {
          alert('Preciso de permissão para camera');
          this.router.navigate(['/home']);
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  public close() {
    this.teste = false;
  }

  public goToCart() {
    this.router.navigate(['/cart'])
  }

  public async question() {
    const alert = await this.alertController.create({
      header: 'Responda',
      message: "Qual é a resposta de 5 + 5?",
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
