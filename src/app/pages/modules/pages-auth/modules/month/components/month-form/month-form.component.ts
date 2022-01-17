import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { MonthService } from 'src/app/shared/services/month.service';

@Component({
  selector: 'app-month-form',
  templateUrl: './month-form.component.html',
  styleUrls: ['./month-form.component.css']
})
export class MonthFormComponent extends BaseResourceFormComponent {

  dateNow: Date = new Date();
  months: any[] = [
    { value: 'JANUARY', text: 'Janeiro', number: 0 },
    { value: 'FEBRUARY', text: 'Fevereiro', number: 1 },
    { value: 'MARCH', text: 'Março', number: 2 },
    { value: 'APRIL', text: 'Abril', number: 3 },
    { value: 'MAY', text: 'Maio', number: 4 },
    { value: 'JUNE', text: 'Junho', number: 5 },
    { value: 'JULY', text: 'Julho', number: 6 },
    { value: 'AUGUST', text: 'Agosto', number: 7 },
    { value: 'SEPTEMBER', text: 'Setembro', number: 8 },
    { value: 'OCTOBER', text: 'Outubro', number: 9 },
    { value: 'NOVEMBER', text: 'Novembro', number: 10 },
    { value: 'DECEMBER', text: 'Dezembro', number: 11 }
  ];

  constructor(
    protected injector: Injector,
    protected service: MonthService,
    private ref: DynamicDialogRef
  ) {
    super(injector, service);
  }

  close(ret?: any): void {
    this.ref.close(ret);
  }

  //METHODS PRIVATE
  protected initForm(): void {
    this.form = this.formBuilder.group({
      month: [this.months.filter((m: any) => m.number == this.dateNow.getMonth())[0].value, [Validators.required, Validators.maxLength(30)]],
      year: [this.dateNow.getFullYear(), [Validators.required, Validators.maxLength(4)]]
    });
  }

  protected posSubmitFormSucesso(): void {
    this.showSuccess('Planilha incluída com sucesso!');
    this.close(true);
  }

  protected setCurrentAction(): void {
    this.currentAction = 'new';
  }
}
