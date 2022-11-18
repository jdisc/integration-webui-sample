import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JdiscIntegrationComponent } from './jdisc-integration.component';
import { JdiscIntegrationResolver } from "./jdisc-integration.resolver";
import { JdiscIntegrationGuard } from "./jdisc-integration.guard";

const routes: Routes = [{path: '', component: JdiscIntegrationComponent, resolve: {state: JdiscIntegrationResolver}, canActivate: [JdiscIntegrationGuard], runGuardsAndResolvers: "always"}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JdiscIntegrationRoutingModule {
}
