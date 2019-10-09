import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfService } from '../core/entities/prof/prof.service';
import { ToastController } from '@ionic/angular';
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
    private appToastService: AppStorageService
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
    if (this.formGroup.valid) {
      const { value } = this.formGroup;
      const token = await this.profService.login(value);
      this.appToastService.setToken(token);
    } else {
      const toast = await this.toastController.create({
        message: 'Campos obrigatórios não preenchidos',
        duration: 2000
      });
      toast.present();
    }
  }

}
