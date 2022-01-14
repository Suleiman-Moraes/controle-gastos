import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeNotAuthComponent } from './components/home-not-auth/home-not-auth.component';

const routes: Routes = [
  {
    path: '', component: HomeNotAuthComponent, children: [
      { path: '', loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesNotAuthRoutingModule { }
