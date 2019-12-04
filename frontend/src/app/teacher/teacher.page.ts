import { Component, OnInit } from '@angular/core';
import { LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import { ProductsService } from '../core/entities/products/products.service';
import { Router } from '@angular/router';
import { QrcodePage } from '../qrcode/qrcode.page';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    public modalController: ModalController,
    private http: HttpClient
  ) { }

  ionViewWillEnter() {
    this.getProducts().then();
  }

  public async getProducts() {
    const loader = await this.loadingController.create({
      message: 'Aguarde...'
    });
    await loader.present();
    this.products = await this.productsService.getProducts().toPromise();
    await loader.dismiss();
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
          text: 'Editar produto',
          icon: 'create',
          handler: () => {
            this.router.navigate(['/teacher/produto/', object.id]);
          }
        },
        {
          text: 'Relatórios de respostas',
          icon: 'stats',
          handler: async () => {
            const question = await this.http.get(`${environment.api}/question/${object.id}`).toPromise() as any;
            this.router.navigate([`/teacher/select-report/${question.id}`]);
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
            return await modal.present();
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
