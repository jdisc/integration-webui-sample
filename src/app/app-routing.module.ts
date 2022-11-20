import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [{path: 'jdisc', loadChildren: () => import('./jdisc-integration/jdisc-integration.module').then(m => m.JdiscIntegrationModule)}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {/*enableTracing: true, */onSameUrlNavigation: "reload", preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
