// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
// Module
import {CoreModule} from '../../../../../core/core.module';
// Portlet
import {PortletClientComponent} from './portlet-client.component';
import {PortletClientHeaderComponent} from './portlet-client-header.component';
import {PortletClientBodyComponent} from './portlet-client-body.component';
import {PortletClientFooterComponent} from './portlet-client-footer.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  declarations: [
    PortletClientComponent,
    PortletClientHeaderComponent,
    PortletClientBodyComponent,
    PortletClientFooterComponent,
  ],
  exports: [
    PortletClientComponent,
    PortletClientHeaderComponent,
    PortletClientBodyComponent,
    PortletClientFooterComponent,
  ]
})
export class PortletClientModule {
}
