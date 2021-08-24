import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ExtractComponent } from '../extract.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ExtractComponent,
    data: {
      title: 'Extrato Corretora'
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
export class ExtractRoutingModule { }
