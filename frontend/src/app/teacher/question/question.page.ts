import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  public form: FormGroup;

  private id: string;

  constructor(
    private formBuild: FormBuilder,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuild.group({
      question: [null, Validators.required],
      answer: [null, Validators.required],
      product: []
    })
  }

  async ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('produto');
    try {
      const question = await this.http.get(`${environment.api}/question/${this.id}`).toPromise();
      if (question) {
        this.form.patchValue(question);
      }
    } catch(err) {

    }
  }

  public async save() {
    try {
      this.form.get('product').patchValue({id: this.id});
      await this.http.post(`${environment.api}/question`, this.form.getRawValue()).toPromise();
      this.router.navigate(['/teacher']);
    } catch (err) {
      const toast = await this.toastController.create({
        message: 'Ocorreu algum problema',
        duration: 2000
      });
      toast.present();
    }
  }

}
