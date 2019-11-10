import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-select-report',
  templateUrl: './select-report.page.html',
  styleUrls: ['./select-report.page.scss'],
})
export class SelectReportPage {

  private id;
  public jogadores;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('questionId');
    this.getPlayer().then();
  }

  private async getPlayer() {
    this.jogadores = await this.http.get(`${environment.api}/question/${this.id}/anwser`).toPromise();
  }

}
