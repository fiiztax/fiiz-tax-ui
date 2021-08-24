
import { NgModule } from '@angular/core';
import { FormsRoutingModule } from './forms-routing/forms-routing.module';
import { FormsComponent } from './forms.component';
import {CommonModule} from '@angular/common';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TabsModule} from 'ngx-bootstrap/tabs';

@NgModule({
    imports: [
        FormsRoutingModule,
        CommonModule,
        AlertModule.forRoot(),
        TabsModule.forRoot()
    ],
  declarations: [ FormsComponent ],
})
export class FormsModule { }
