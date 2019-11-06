import { Component, OnInit } from '@angular/core';
import { LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import { ProductsService } from '../core/entities/products/products.service';
import { Router } from '@angular/router';
import { QrcodePage } from '../qrcode/qrcode.page';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
})
export class TeacherPage {

  public products = [] as any;

  constructor(
    private loadingController: LoadingController,
    private productsService: ProductsService,
    private actionSheetController: ActionSheetController,
    private router: Router,
    public modalController: ModalController
  ) { }

  ionViewWillEnter() {
    this.getProducts().then();
  }

  public async getProducts() {
    const loader = await this.loadingController.create({
      message: 'Aguarde...'
    });
    this.products = await this.productsService.getProducts().toPromise();
    loader.dismiss();
  }

  public exit() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  public async actionSheet(object) {
    const actionSheet = await this.actionSheetController.create(
      {
        header: `Detalhes do ${object.name}`,
        buttons: [{
          text: 'Editar',
          icon: 'create',
          handler: () => {
            this.router.navigate(['/teacher/produto/', object.id]);
          }
        },
        {
          text: 'Gerenciar pergunta',
          icon: 'help',
          handler: () => {
            this.router.navigate([`/teacher/${object.id}/question`]);
          }
        },
        {
          text: 'Gerar qrcode',
          icon: 'add',
          handler: async () => {
            const modal = await this.modalController.create({
              component: QrcodePage,
              componentProps: {
                id: object.id.toString()
              }
            });
            debugger
            return await modal.present();
          }
        },
        {
          text: 'Remover',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }]
      });
    await actionSheet.present();
  }

}
