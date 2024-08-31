import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { HrComponent } from './hr/hr.component';
import { MarketingComponent } from './marketing/marketing.component';
import { SalesComponent } from './sales/sales.component';


@NgModule({
  declarations: [HrComponent,MarketingComponent,SalesComponent],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
