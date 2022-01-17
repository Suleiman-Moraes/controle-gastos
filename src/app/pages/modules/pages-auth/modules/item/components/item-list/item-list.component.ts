import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent extends BaseResourceListComponent {

  constructor(
    protected service: ItemService,
    protected injector: Injector
  ) {
    super(service, injector);
  }
}
