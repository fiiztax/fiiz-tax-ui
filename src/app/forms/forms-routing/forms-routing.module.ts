import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { FormsComponent } from '../forms.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FormsComponent,
    data: {
      title: 'Imposto'
    }
  }
];
@NgModule({
    imports: [
      RouterModule.forChild(routes), HttpClientModule
    ],
    exports: [
      RouterModule
    ],
})
export class FormsRoutingModule { }
