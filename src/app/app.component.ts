import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, ActivatedRoute, NavigationEnd, Event} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'app works!';
  count: number;
  username:  string;
  baseUrl = `https://fiiztax.technology/tax/fii/wallet/`;


  constructor(private titleService: Title, private router: Router, activatedRoute: ActivatedRoute,
              private httpClient: HttpClient, private authenticationService: AuthenticationService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(router.routerState, router.routerState.root).join(' | ');
        titleService.setTitle(title);
      }
    });

    try {
      this.httpClient.get(this.baseUrl + this.authenticationService.currentUserValueId.clientId.toString())
          .subscribe(data => {
                console.log(data);
              }, (err: any) => {
                console.log('redirectiong to login');
                this.authenticationService.logout();
                this.router.navigate(['/login']);
              }
          );
    } catch (e) {
      console.log('error no app');
    }
  }

  ngOnInit() {
  }


  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
