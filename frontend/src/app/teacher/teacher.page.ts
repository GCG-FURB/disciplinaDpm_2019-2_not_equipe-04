import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
    private productsService: ProductsService
  ) { }

  ionViewWillEnter() {
    this.getProducts().then();
  }

  public async getProducts() {
    const loader = await this.loadingController.create({
      message: 'Aguarde...'
    });
    this.products = await this.productsService.getProducts().toPromise();
    debugger
    loader.dismiss();
  }

}
