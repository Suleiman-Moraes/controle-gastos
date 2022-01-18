import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ItemService } from 'src/app/shared/services/item.service';
import { MonthService } from 'src/app/shared/services/month.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent extends BaseResourceListComponent {

  month: any = {};

  constructor(
    protected service: ItemService,
    protected injector: Injector,
    private monthService: MonthService
  ) {
    super(service, injector);
  }

  buildForm(): void {
    this.filterForm = this.formBuilder.group({
      page: [this.page],
      size: [this.size],
      monthId: [this.month.id]
    });
  }

  //PRIVATE METHODS
  protected posNgOnInit(): void {
    this.month.id = this.route.snapshot.params.monthId;
    this.filterForm.get('monthId')?.setValue(this.month.id);
    this.buscar(this.monthService.getById(this.month.id), 'month', () => this.findByPararamsFilter());
  }
}
