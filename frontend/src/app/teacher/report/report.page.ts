import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Status', 'Valor'],
      ['Acerto',     11],
      ['Erro',      2]
    ],
    options: {'title': 'Tentativas de repostas'},
  };

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.http.get(`${environment.api}/question/anwser/${this.activatedRoute.snapshot.paramMap.get('player')}`)
      .subscribe(data => {
      this.pieChart = {
        chartType: 'PieChart',
        dataTable: [
          ['Status', 'Valor'],
          ['Acerto',    data[0]],
          ['Erro',      data[1]]
        ],
        options: {'title': 'Tasks'},
      };
    });
  }

}
