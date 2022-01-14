import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { TemplateModule } from '../template/template.module';
import { HomeNotAuthComponent } from './components/home-not-auth/home-not-auth.component';
import { PagesNotAuthRoutingModule } from './pages-not-auth-routing.module';

@NgModule({
  declarations: [
    HomeNotAuthComponent
  ],
  imports: [
    SharedModule,
    PagesNotAuthRoutingModule,
    TemplateModule
  ]
})
export class PagesNotAuthModule { }
