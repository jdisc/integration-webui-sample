import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: 'jdisc', loadChildren: () => import('./jdisc-integration/jdisc-integration.module').then(m => m.JdiscIntegrationModule)}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true, onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
