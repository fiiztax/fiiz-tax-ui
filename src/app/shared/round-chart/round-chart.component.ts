import { Component, OnInit } from '@angular/core';
import FiiTax from '../../forms/FiiTax';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../_services';
import {Router} from '@angular/router';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-round-chart',
  templateUrl: './round-chart.component.html',
  styleUrls: ['./round-chart.component.scss']
})
export class RoundChartComponent implements OnInit {
  public doughnutChartType: ChartType = 'doughnut';
  clientId: string;
  public success = false;
  baseUrl = `https://fiiztax.technology/tax/fii/darf_ano/`;

  public monthLabels: Array<any>;
  public darfValue: number[];
  public doughnutChartData: number[];


  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService,
              private router: Router) {}


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this.clientId = this.authenticationService.currentUserValueId.clientId.toString();
    console.log('client_id: ', this.clientId);


    this.httpClient.get(this.baseUrl + this.clientId.toString())
        .subscribe(data => {
          console.log(data);
          this.monthLabels = data['month'] as string[];
          this.doughnutChartData = data['darf'] as number[];

          console.log('rounded y: ', this.monthLabels);
          console.log('rounded d: ', this.darfValue);

        }, (err: any) => {
          if (err.status === 403) {
            console.log('redirectiong to login');
            this.authenticationService.logout();
            this.router.navigate(['/login']);
          } else {
            console.log('erro_get chart' + err);
          }
        });
  }}
