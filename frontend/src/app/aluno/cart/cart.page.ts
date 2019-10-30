import { Component } from '@angular/core';
import { AppStorageService } from 'src/app/core/app-storage/app-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {

  public products = [];
  public total = 0;

  constructor(
    private appStorage: AppStorageService
  ) { }

  ionViewWillEnter() {
    this.total = 0;
    this.products = this.appStorage.getCart();
    this.products.forEach(itens => this.total += itens.price)
  }

}
