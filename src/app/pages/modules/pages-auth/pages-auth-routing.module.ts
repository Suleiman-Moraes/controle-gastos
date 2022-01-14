import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeAuthComponent } from './components/home-auth/home-auth.component';

const routes: Routes = [
  {
    path: '', component: HomeAuthComponent, children: [
      { path: 'month', loadChildren: () => import('./modules/month/month.module').then(m => m.MonthModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesAuthRoutingModule { }
