import { Component, OnInit } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ProductsService } from '../core/entities/products/products.service';

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
    private androidPermissions: AndroidPermissions,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          console.log('aqu ');
          this.qrScanner.show();

        } else if (status.denied) {
          this.androidPermissions.requestPermissions(
            [
              this.androidPermissions.PERMISSION.CAMERA
            ]
          );
        } else {
          alert('Preciso de permissão para câmera');
          this.router.navigate(['/home']);
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  ionViewWillEnter() {

  }

  private qrCode() {
    const scanSub = this.qrScanner.scan().subscribe((id: string) => {
      this.onQrCode(id).then();
      scanSub.unsubscribe();
    });
  }

  private async onQrCode(id) {
    try {
      const product = await this.productService.getProduct(id).toPromise() as any;
      if (product && product.image) {
        this.image = product.image;
      } else {
        this.qrCode();
      }
    } catch (err) {
      this.qrCode();
    }
  }

  public close() {
    this.image = '';
    this.qrCode();
  }

  public goToCart() {
    this.router.navigate(['/cart']);
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
