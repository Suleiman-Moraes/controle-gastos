import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../pages-not-auth/modules/security/auth.guard';
import { ItemListComponent } from './components/item-list/item-list.component';

const routes: Routes = [
  { path: ':monthId', component: ItemListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
