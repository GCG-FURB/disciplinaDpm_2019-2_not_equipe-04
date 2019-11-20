import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { ProfService } from '../core/entities/prof/prof.service';
import { Router } from '@angular/router';
import { AppStorageService } from '../core/app-storage/app-storage.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private toastController: ToastController,
    private profService: ProfService,
    private loadingController: LoadingController,
    private router: Router,
    private appStorage: AppStorageService
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuild.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  public async create() {
    const loader = await this.loadingController.create({
      message: 'Aguarde..'
    });
    await loader.present();
    try {
      if (this.formGroup.valid) {
        const { value } = this.formGroup;
        await this.profService.create(value).toPromise();
        const teacher = await this.profService.login(value).toPromise();
        if (teacher) {
          this.appStorage.setTeacher(teacher);
          this.router.navigate(['/teacher']);
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        const toast = await this.toastController.create({
          message: 'Campos obrigatórios não preenchidos',
          duration: 2000
        });
        toast.present();
      }
    } catch (err) {
      const toast = await this.toastController.create({
        message: 'Ocorreu um problema!',
        duration: 2000
      });
      toast.present();
    }
    await loader.dismiss();
  }

}
