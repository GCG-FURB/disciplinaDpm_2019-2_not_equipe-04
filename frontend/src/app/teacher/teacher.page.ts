import { Component, OnInit } from '@angular/core';
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { ProductsService } from '../core/entities/products/products.service';

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
    private actionSheetController: ActionSheetController
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

  public async actionSheet(object) {
    const actionSheet = await this.actionSheetController.create({
      header: `Detalhes do ${object.name}`,
      buttons: [{
        text: 'Editar',
        icon: 'create',
        handler: () => {
          console.log('Delete clicked');
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
