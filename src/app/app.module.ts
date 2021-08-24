import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BlankTemplateComponent } from './template/blank-template.component';
import { LeftNavTemplateComponent } from './template/left-nav-template.component';
import { AppRoutingModule, routes } from './app.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap';
import {JwtInterceptor, ErrorInterceptor} from './_helpers';
import { AlertComponent } from './_components';



@NgModule({
  declarations: [
    AppComponent,
    BlankTemplateComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LeftNavTemplateComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
  ],
    imports: [
        BrowserModule,
        BsDropdownModule.forRoot(),
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot(routes, {useHash: true}),
        ReactiveFormsModule,
        BsDropdownModule
    ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
      ],
  bootstrap: [AppComponent]
})
export class AppModule {}
