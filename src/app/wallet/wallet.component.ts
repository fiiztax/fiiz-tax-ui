import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import FiiTax from '../forms/FiiTax';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../_services';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  public pageData;

  clientId: string;
  public dataOut: FiiTax[];
  public tatalLucro = 0;
  public tatalDarf = 0;
  public tatalTaxas = 0;
  public success = false;
  baseUrl = `https://fiiztax.technology/tax/fii/wallet/`;
  baseUrlB = `https://fiiztax.technology/tax/fii/darf/`;
  public monthLabels: Array<any>;
  public darfValue: number[];
  public lineChartData: Array<any>;
  public singleArray: Array<any>;

  constructor(private router: Router, private authenticationService: AuthenticationService, private route: ActivatedRoute,
              private httpClient: HttpClient) { }

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
                      console.log('data_from_get: ', this.dataOut);
                      this.success = true;
                      this.tatalLucro = this.dataOut.reduce((acc, val) => acc += val.totalProfitValue, 0);
                      this.tatalDarf = this.dataOut.reduce((acc, val) => acc += val.fixedTax, 0);
                      this.tatalTaxas = this.dataOut.reduce((acc, val) => acc += val.totalTaxes, 0);
                      console.log('profit: ', this.tatalLucro);
                  }
              }, (err: any) => {
                  this.success = false;
                  if (err.status === 403) {
                      console.log('redirectiong to login');
                      this.authenticationService.logout();
                      this.router.navigate(['/login']);
                  } else {
                        console.log('erro_get');
                    }
              }
          );

      // for table only
      this.httpClient.get(this.baseUrlB + this.clientId.toString())
          .subscribe(data => {
              console.log(data);
              this.monthLabels = data['month'] as string[];
              this.darfValue = data['darf'] as number[];
              for (let _i = 0; _i < this.monthLabels.length; _i++) {
                  this.singleArray.push({
                      mes: this.monthLabels[_i],
                      darf: this.darfValue[_i]
                  });
              }

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
  }
}
