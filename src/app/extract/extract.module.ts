import { NgModule } from '@angular/core';
import { ExtractRoutingModule } from './ectract-routing/extract-routing.module';
import { ExtractComponent } from './extract.component';
import {CommonModule} from '@angular/common';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TabsModule} from 'ngx-bootstrap/tabs';
import FiiSubscricao from './FiiSubscricao';


@NgModule({
    imports: [
        ExtractRoutingModule,
        CommonModule,
        AlertModule.forRoot(),
        TabsModule.forRoot()
    ],
  declarations: [ ExtractComponent ],
})
export class ExtractModule { }
