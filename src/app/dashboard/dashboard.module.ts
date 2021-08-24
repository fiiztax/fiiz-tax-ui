import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  imports: [
    DashboardRoutingModule, ChartsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [ DashboardComponent]
})
export class DashboardModule { }
