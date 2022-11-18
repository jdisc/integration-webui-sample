import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JdiscIntegrationComponent } from './jdisc-integration.component';
import { JdiscIntegrationResolver } from "./jdisc-integration.resolver";

const routes: Routes = [{ path: '', component: JdiscIntegrationComponent, resolve: { state: JdiscIntegrationResolver }}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JdiscIntegrationRoutingModule { }
