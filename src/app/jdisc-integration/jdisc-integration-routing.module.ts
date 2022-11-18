import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JdiscIntegrationComponent } from './jdisc-integration.component';

const routes: Routes = [{ path: '', component: JdiscIntegrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JdiscIntegrationRoutingModule { }
