import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfService } from '../core/entities/prof/prof.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { AppStorageService } from '../core/app-storage/app-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profService: ProfService,
    private toastController: ToastController,
    private appToastService: AppStorageService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    })
  }

  public createAccount() {
    this.router.navigate(['/create-account']);
  }

  public async create() {
    const loader = await this.loadingController.create({
      message: 'Aguarde..'
    });
    try {
      if (this.formGroup.valid) {
        const { value } = this.formGroup;
        const teacher = await this.profService.login(value).toPromise();
        if (teacher) {
          this.appToastService.setTeacher(teacher);
          this.router.navigate(['/teacher']);
        } else {
          const toast = await this.toastController.create({
            message: 'E-mail ou senha inválidos',
            duration: 2000
          });
          toast.present();  
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
    loader.dismiss();
  }

}
