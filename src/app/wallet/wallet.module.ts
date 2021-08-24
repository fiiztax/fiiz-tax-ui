import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import { BarChartComponent } from '../shared/bar-chart/bar-chart.component';
import {ChartsModule} from 'ng2-charts';
import { WalletRoutingModule } from './wallet-routing/wallet-routing.module';
import {LineChartComponent} from '../shared/line-chart/line-chart.component';
import {RoundChartComponent} from '../shared/round-chart/round-chart.component';

@NgModule({
  imports: [
    CommonModule,
    WalletRoutingModule,
    ChartsModule
  ],
  declarations: [ WalletComponent, BarChartComponent, LineChartComponent, RoundChartComponent],
  providers: [BarChartComponent, LineChartComponent, RoundChartComponent]
})
export class WalletModule { }
