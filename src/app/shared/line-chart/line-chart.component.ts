import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../_services';
import {Router} from '@angular/router';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  baseUrl = `https://fiiztax.technology/tax/fii/darf/`;
  // lineChart
    public lineChartOptions: any = {
      responsive: true
    };
    public lineChartColors: Array<any> = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';

    public monthLabels: Array<any>;
    public darfValue: number[];
    public lineChartData: Array<any>;
    clientId: string;


  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService,
              private router: Router) { }







  ngOnInit() {
      this.clientId = this.authenticationService.currentUserValueId.clientId.toString();
      console.log('client_id: ', this.clientId);

      this.httpClient.get(this.baseUrl + this.clientId.toString())
          .subscribe(data => {
                console.log(data);
                  this.monthLabels = data['month'] as string[];
                  this.darfValue = data['darf'] as number[];
                  this.lineChartData = [
                    { data: this.darfValue, label: 'Valor do DARF (R$)' }
                  ];

                  console.log('m: ', this.monthLabels);
                  console.log('d: ', this.darfValue);

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
