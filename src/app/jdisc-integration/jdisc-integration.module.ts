import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JdiscIntegrationRoutingModule } from './jdisc-integration-routing.module';
import { JdiscIntegrationComponent } from './jdisc-integration.component';


@NgModule({
  declarations: [
    JdiscIntegrationComponent
  ],
  imports: [
    CommonModule,
    JdiscIntegrationRoutingModule
  ]
})
export class JdiscIntegrationModule { }
