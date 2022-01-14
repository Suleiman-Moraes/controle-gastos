import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateModule } from '../template/template.module';
import { HomeAuthComponent } from './components/home-auth/home-auth.component';
import { PagesAuthRoutingModule } from './pages-auth-routing.module';

@NgModule({
  declarations: [
    HomeAuthComponent
  ],
  imports: [
    CommonModule,
    PagesAuthRoutingModule,
    TemplateModule
  ]
})
export class PagesAuthModule { }
