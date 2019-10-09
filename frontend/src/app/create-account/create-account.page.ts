import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ProfService } from '../core/entities/prof/prof.service';

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
    private profService: ProfService
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuild.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  public async create() {
    if (this.formGroup.valid) {
      const { value } = this.formGroup;
      await this.profService.create(value);
    } else {
      const toast = await this.toastController.create({
        message: 'Campos obrigatórios não preenchidos',
        duration: 2000
      });
      toast.present();
    }
  }

}
