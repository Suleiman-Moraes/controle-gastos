import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../pages-not-auth/modules/security/auth.guard';
import { MonthListComponent } from './components/month-list/month-list.component';

const routes: Routes = [
  { path: '', component: MonthListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthRoutingModule { }
