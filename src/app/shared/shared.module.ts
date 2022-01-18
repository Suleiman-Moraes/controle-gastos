import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IMaskModule } from 'angular-imask';
import { ButtonModule } from 'primeng-lts/button';
import { CalendarModule } from 'primeng-lts/calendar';
import { CardModule } from 'primeng-lts/card';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';
import { DropdownModule } from 'primeng-lts/dropdown';
import { DynamicDialogModule } from 'primeng-lts/dynamicdialog';
import { InputMaskModule } from 'primeng-lts/inputmask';
import { InputNumberModule } from 'primeng-lts/inputnumber';
import { InputTextModule } from 'primeng-lts/inputtext';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { PaginatorModule } from 'primeng-lts/paginator';
import { PanelModule } from 'primeng-lts/panel';
import { TooltipModule } from 'primeng-lts/tooltip';

import { ButtonsFooterCrudComponent } from './components/buttons-footer-crud/buttons-footer-crud.component';
import { ComboComponent } from './components/combo/combo.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { InputTemplateComponent } from './components/input-template/input-template.component';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component'
import { ValueOrTracePipe } from './pipe/value-or-trace.pipe';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    ValueOrTracePipe,
    TableComponent,
    FormFieldErrorComponent,
    InputTemplateComponent,
    InputComponent,
    ComboComponent,
    ButtonsFooterCrudComponent,
    HeaderPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    PanelModule,
    PaginatorModule,
    DropdownModule,
    CalendarModule,
    InputMaskModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    IMaskModule,
    TooltipModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    PanelModule,
    PaginatorModule,
    DropdownModule,
    CalendarModule,
    InputMaskModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    IMaskModule,
    TooltipModule,

    //Components
    TableComponent,
    FormFieldErrorComponent,
    InputTemplateComponent,
    InputComponent,
    ComboComponent,
    ButtonsFooterCrudComponent,
    HeaderPageComponent,

    //Pipes
    ValueOrTracePipe
  ]
})
export class SharedModule { }
