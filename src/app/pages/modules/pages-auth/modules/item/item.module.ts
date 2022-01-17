import { NgModule } from '@angular/core';

import { ItemRoutingModule } from './item-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';


@NgModule({
  declarations: [
    ItemFormComponent,
    ItemListComponent
  ],
  imports: [
    SharedModule,
    ItemRoutingModule
  ]
})
export class ItemModule { }
