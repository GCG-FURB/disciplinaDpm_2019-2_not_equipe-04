import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { ProductsService } from 'src/app/core/entities/products/products.service';
import { AppStorageService } from 'src/app/core/app-storage/app-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  @ViewChild('image', null) image: ElementRef;

  public formGroup: FormGroup;

  private id: string;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private productService: ProductsService,
    private appStorageService: AppStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      image: [null, Validators.compose([Validators.required])]
    });
  }

  ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (!this.isNew()) {
      this.getProduct().then();
    }
  }

  private async getProduct() {
    const form = await this.productService.getProduct(this.id).toPromise();
    this.formGroup.patchValue(form);
  }


  public selectImage() {
    this.image.nativeElement.click();
  }

  public onChangeImage(blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob.srcElement.files[0]);
    reader.onloadend = () => {
      const base64data = reader.result;
      this.formGroup.get('image').patchValue(base64data);
    }
  }

  public isNew() {
    return this.id === 'new';
  }

  public async save() {
    const loader = await this.loadingController.create({
      message: 'Aguarde..'
    });
    try {
      if (this.formGroup.valid) {
        const { value } = this.formGroup;
        value.teacher = this.appStorageService.getTeacher();
        if (this.isNew()) {
          await this.productService.create(value).toPromise();
          this.router.navigate(['/teacher']);
        } else {
          await this.productService.atualizar(this.id, value).toPromise();
        }
      } else {
        const toast = await this.toastController.create({
          message: 'Verifique os campos obrigatórios',
          duration: 2000
        });
        toast.present();
      }
    } catch (err) {
      const toast = await this.toastController.create({
        message: 'Ocorreu algum problema',
        duration: 2000
      });
      toast.present();
    }
    await loader.dismiss();
  }

}
