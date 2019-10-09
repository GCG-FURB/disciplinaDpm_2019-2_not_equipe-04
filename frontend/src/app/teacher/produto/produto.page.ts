import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  @ViewChild('image') image: ElementRef;

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      photo: [null]
    });
  }

  public selectImage() {
    this.image.nativeElement.click();
  }

}
