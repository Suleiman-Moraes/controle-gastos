import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'authpages', loadChildren: () => import('./modules/pages-auth/pages-auth.module').then(m => m.PagesAuthModule) },
  { path: 'pages', loadChildren: () => import('./modules/pages-not-auth/pages-not-auth.module').then(m => m.PagesNotAuthModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
