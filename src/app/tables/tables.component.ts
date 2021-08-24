import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import FiiTax from '../forms/FiiTax';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services';
import FiiSubscricao from '../extract/FiiSubscricao';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  clientId: number;
  public dataOut: FiiTax[];
  public dataOutSubscricao: FiiSubscricao[];
  public success = false;
  baseUrl = `https://fiiztax.technology/tax/fii/wallet/`;
  baseUrlS = `https://fiiztax.technology/tax/fii/subscricao/`;


  constructor(private router: Router,
              private httpClient: HttpClient,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
      console.log('client_id: ', this.authenticationService.currentUserValueId.clientId);
      this.clientId = this.authenticationService.currentUserValueId.clientId;
      console.log('id: ',  this.clientId);



      this.httpClient.get(this.baseUrl + this.clientId.toString())
        .subscribe(data => {
              console.log(data);
              if (data === null) {
                  this.success = false;
              } else {
                  this.dataOut =  data['transactionList'] as FiiTax[];
                  console.log('data_from_get: ', this.dataOut);
                  this.success = true;
              }
            }, (err: any) => {
                this.success = false;
                console.log('redirectiong to login');
                this.authenticationService.logout();
                this.router.navigate(['/login']);
            }
        );

      this.httpClient.get(this.baseUrlS + this.clientId.toString())
          .subscribe(data => {
                  console.log('sub: ' + data);
                  if (data === null) {
                      this.success = false;
                  } else {
                      this.dataOutSubscricao =  data['subscricaoList'] as FiiSubscricao[];
                      console.log('data_from_get_sub: ', this.dataOutSubscricao);
                      this.success = true;
                  }
              }, (err: any) => {
                  this.success = false;
                  console.log('redirectiong to login');
                  this.authenticationService.logout();
                  this.router.navigate(['/login']);
              }
          );
  }

    deleteTransaction(i) {
      console.log(i);

        this.httpClient.delete(this.baseUrl + this.clientId.toString() + '/' + this.dataOut[i].transactionId)
            .subscribe(
                (data: any) => {
                    console.log('data: ' + data);
                    window.location.reload();
                }, (err: any) => {
                    console.log('error' + err);
                    this.ngOnInit();
                    if (err.status === 403) {
                        console.log('redirectiong to login delete');
                        this.authenticationService.logout();
                        this.router.navigate(['/login']);
                        console.log('generic error in get: ' + err);
                    }
                }
            );

    }

    deleteSubscricao(i) {
        console.log(i);

        this.httpClient.delete(this.baseUrlS + this.clientId.toString() + '/' + this.dataOutSubscricao[i].transactionId)
            .subscribe(
                (data: any) => {
                    console.log('data: ' + data);
                    window.location.reload();
                }, (err: any) => {
                    console.log('error' + err);
                    this.ngOnInit();
                    if (err.status === 403) {
                        console.log('redirectiong to login delete');
                        this.authenticationService.logout();
                        this.router.navigate(['/login']);
                        console.log('generic error in get: ' + err);
                    }
                }
            );

    }
}
