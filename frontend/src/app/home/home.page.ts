import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AppStorageService } from '../core/app-storage/app-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private alertController: AlertController,
    private appStorageService: AppStorageService,
    private router: Router
  ) { }

  public async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Digite seu nome!',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Digite seu nome...'
        }
      ],
      buttons: [
        {
          text: 'Canclar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: 'Ok',
          handler: (event) => {
            this.appStorageService.setAluno(event.name);
            this.router.navigate(['/aluno']);
          }
        }
      ]
    });
    await alert.present();
  }
}
