import { Component, OnInit } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ProductsService } from '../core/entities/products/products.service';
import { AppStorageService } from '../core/app-storage/app-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.page.html',
  styleUrls: ['./aluno.page.scss'],
})
export class AlunoPage implements OnInit {
  public product = '';
  public questionItem = {} as any;

  constructor(
    private qrScanner: QRScanner,
    private router: Router,
    private alertController: AlertController,
    private androidPermissions: AndroidPermissions,
    private productService: ProductsService,
    private appStorage: AppStorageService,
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
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
    setTimeout(() => {
      if (!this.product) {
        this.onQrCode(2).then();
      }
    });
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
      debugger
      if (product && product.image) {
        this.product = product;
        this.questionItem = await this.http.get(`${environment.api}/question/${product.id}`).toPromise();
      } else {
        this.qrCode();
      }
    } catch (err) {
      this.qrCode();
    }
  }

  public close() {
    this.product = null;
    this.qrCode();
  }

  public goToCart() {
    this.router.navigate(['/cart']);
  }

  public async question() {
    const alert = await this.alertController.create({
      header: this.questionItem.question,
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
          handler: async (event) => {
            if (event.response == this.questionItem.answer) {
              let cart = this.appStorage.getCart();
              if (!cart) {
                cart = [];
              }
              cart.push(this.product);
              this.appStorage.setCart(cart);
              this.product = null;
              alert.dismiss();
            } else {
              const toast = await this.toastController.create({
                message: 'Sua resposta não está correta, tente novamente',
                duration: 2000,
                position: "top",
                color: "warning"
              });
              toast.present();
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
