import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AuthenticationService, UserService} from '../_services';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User, UserInfo} from '../_models';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public pageData;
  currentUser: UserInfo;
  baseUrlA = `https://fiiztax.technology/tax/userinfo`;
  clientId: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private httpClient: HttpClient) {

  }

  ngOnInit() {
      this.pageData = <any>this.route.snapshot.data;
      this.clientId = this.authenticationService.currentUserValueId.clientId.toString();

      this.httpClient.get(this.baseUrlA)
        .subscribe( data => {
              console.log('data: ' + data);
              this.currentUser = data as UserInfo;
            },
            (err: any) => {
                console.log('redirectiong to login');
                this.authenticationService.logout();
                this.router.navigate(['/login']);
            });
  }

}
