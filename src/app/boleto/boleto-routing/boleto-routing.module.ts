import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { BoletoComponent } from '../boleto.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BoletoComponent,
    data: {
      title: 'FIIZ TAX | DARF'
    }
  }
];
@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class BoletoRoutingModule { }
