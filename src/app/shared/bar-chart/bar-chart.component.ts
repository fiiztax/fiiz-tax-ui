import { Component, OnInit } from '@angular/core';
import FiiTax from '../../forms/FiiTax';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../_services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;
  clientId: string;
  public dataOut: FiiTax[];
  public dataOutLucro: number[];
  public dataOutCompra: number[];
  public success = false;
  baseUrl = `https://fiiztax.technology/tax/fii/wallet/`;

  public barChartData2: any[];

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService,
              private router: Router) {}



  ngOnInit() {
    this.clientId = this.authenticationService.currentUserValueId.clientId.toString();
    console.log('client_id: ', this.clientId);


    this.httpClient.get(this.baseUrl + this.clientId.toString())
        .subscribe(data => {
              console.log(data);
              if (data === null) {
                this.success = false;
              } else {
                this.dataOut = data['transactionList'] as FiiTax[];
                this.dataOutLucro = this.dataOut.reduce((c, v) => c.concat(v), []).map(o => o.totalProfitValue);
                this.dataOutCompra = this.dataOut.reduce((c, v) => c.concat(v), []).map(o => o.totalTransactionIn);
                this.barChartLabels = this.dataOut.reduce((c, v) => c.concat(v), []).map(o => o.name);
                this.success = true;
                this.barChartData2 = [
                  { data: this.dataOutLucro, label: 'Lucro Líquido (R$)' },
                  { data: this.dataOutCompra, label: 'Valor da Compra (R$)' }
                ];

                console.log('chart: ', this.dataOutLucro);


              }
            }, (err: any) => {
              this.success = false;
              if (err.status === 403) {
                console.log('redirectiong to login');
                this.authenticationService.logout();
                this.router.navigate(['/login']);
              } else {
                console.log('erro_get chart' + err);
              }
            }
        );
  }}
