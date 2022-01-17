import { Component, Injector, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { MonthService } from 'src/app/shared/services/month.service';

import { MonthFormComponent } from '../month-form/month-form.component';

@Component({
  selector: 'app-month-list',
  templateUrl: './month-list.component.html',
  styleUrls: ['./month-list.component.css'],
  providers: [DialogService]
})
export class MonthListComponent extends BaseResourceListComponent implements OnDestroy {

  private ref: DynamicDialogRef | undefined;

  constructor(
    protected service: MonthService,
    protected injector: Injector,
    private dialogService: DialogService
  ) {
    super(service, injector);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  showForm() {
    this.ref = this.dialogService.open(MonthFormComponent, {
      header: 'Nova Planilha',
      width: '70%',
      contentStyle: { "height": "300px", "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((ret: any) => {
      if (ret) {
        this.paginate();
      }
    });
  }
}
