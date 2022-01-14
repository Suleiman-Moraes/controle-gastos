import { NgModule } from '@angular/core';

import { MonthRoutingModule } from './month-routing.module';
import { MonthListComponent } from './components/month-list/month-list.component';
import { MonthFormComponent } from './components/month-form/month-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MonthListComponent,
    MonthFormComponent
  ],
  imports: [
    SharedModule,
    MonthRoutingModule
  ]
})
export class MonthModule { }
