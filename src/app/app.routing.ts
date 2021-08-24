import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlankTemplateComponent} from './template/blank-template.component';
import {LeftNavTemplateComponent} from './template/left-nav-template.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import { AuthGuard } from './_helpers';


export const routes: Routes = [{
  path: '',
  redirectTo: 'forms',
  pathMatch: 'full',
  canActivate: [AuthGuard]
}, {
  path: '',
  component: LeftNavTemplateComponent,
  data: {
    title: 'FIIZ TAX'
  },
  children: [
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule),
      data: {
        title: 'Calculadora'
      },
      canActivate: [AuthGuard]
    },
    {
      path: 'extract',
      loadChildren: () => import('./extract/extract.module').then(m => m.ExtractModule),
      data: {
        title: 'Extrato'
      },
      canActivate: [AuthGuard]
    },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      data: {
        title: 'Home'
      },
      canActivate: [AuthGuard]
    },
    {
      path: 'contact',
      loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
      data: {
        title: ''
     },
      canActivate: [AuthGuard]
    }
  ]
}, {
  path: 'tables',
  component: LeftNavTemplateComponent,
  data: {
    title: ''
  },
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
    }
  ]
},
{
  path: 'extract',
  component: LeftNavTemplateComponent,
  data: {
    title: ''
  },
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      loadChildren: () => import('./extract/extract.module').then(m => m.ExtractModule)
    }
  ]
},
{
  path: 'contact',
  component: LeftNavTemplateComponent,
  data: {
    title: ''
  },
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
    }
  ]
},
{
  path: 'wallet',
  component: LeftNavTemplateComponent,
  data: {
    title: ''
  },
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule)
    }
  ]
},
{
  path: 'boleto',
  component: LeftNavTemplateComponent,
  data: {
    title: ''
  },
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      loadChildren: () => import('./boleto/boleto.module').then(m => m.BoletoModule)
    }
  ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
