import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables.component';
import {ChartsModule} from 'ng2-charts';



import { TablesRoutingModule } from './tables-routing/tables-routing.module';
import {TabsModule} from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule,
    ChartsModule,
    TabsModule.forRoot()
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ TablesComponent],
  providers: []
})
export class TablesModule { }
