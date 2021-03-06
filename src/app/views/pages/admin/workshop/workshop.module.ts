import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkshopRoutingModule} from './workshop-routing.module';
import {WorkshopComponent} from './workshop.component';
import {ClientComponent} from './client/client.component';
import {ClientEditComponent} from './client/client-edit/client-edit.component';
import {CompanyComponent} from './company/company.component';
import {CoreModule} from '../../../../core/core.module';
import {PartialsModule} from '../../../partials/partials.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import {ClientNoteComponent} from './client/client-note/client-note.component';
import {VehicleComponent} from './vehicle/vehicle.component';
import {ReceptionComponent} from './reception/reception.component';
import {ClientVehicleComponent} from './client/client-vehicle/client-vehicle.component';
import {CompanyEditComponent} from './company/company-edit/company-edit.component';
import {CompanyNoteComponent} from './company/company-note/company-note.component';
import {CompanyVehicleComponent} from './company/company-vehicle/company-vehicle.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {VehicleRepairComponent} from './vehicle/vehicle-repair/vehicle-repair.component';
import {VehicleEditComponent} from './vehicle/vehicle-edit/vehicle-edit.component';
import {VehicleListComponent} from './vehicle/vehicle-list/vehicle-list.component';

import {WorkHeaderComponent} from './vehicle/vehicle-repair/work-header/work-header.component';
import {WorkTodoRepairComponent} from './vehicle/vehicle-repair/work-todo-repair/work-todo-repair.component';
import {WorkTodoItemRepairComponent} from './vehicle/vehicle-repair/work-todo-repair/work-todo-item-repair/work-todo-item-repair.component';
import {WorkThirdpartyComponent} from './vehicle/vehicle-repair/work-thirdparty/work-thirdparty.component';
import {WorkMaterialsComponent} from './vehicle/vehicle-repair/work-materials/work-materials.component';
import {WorkAccesoriesComponent} from './vehicle/vehicle-repair/work-accesories/work-accesories.component';
import {WorkQaComponent} from './vehicle/vehicle-repair/work-qa/work-qa.component';
import {WorkMaintenanceComponent} from './vehicle/vehicle-repair/work-maintenance/work-maintenance.component';
import {DialogPrintReceptionDialog, VehicleReceptionComponent} from './vehicle/vehicle-reception/vehicle-reception.component';
import {WorkStatusComponent} from './vehicle/vehicle-reception/work-status/work-status.component';
import {WorkTodoComponent} from './vehicle/vehicle-reception/work-todo/work-todo.component';
import {VehicleHistoryComponent} from './vehicle/vehicle-history/vehicle-history.component';
import {WorkResumeComponent} from './vehicle/vehicle-history/work-resume/work-resume.component';
import {WorkDocumentsComponent} from './vehicle/vehicle-history/work-documents/work-documents.component';
import {DialogCarPhotoDialog, WorkPhotosComponent} from './vehicle/vehicle-history/work-photos/work-photos.component';
import {VehicleResumeComponent} from './vehicle/vehicle-resume/vehicle-resume.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FilePondModule, registerPlugin} from 'ngx-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import { WorkTodoItemComponent } from './vehicle/vehicle-reception/work-todo/work-todo-item/work-todo-item.component';
import { WorkStatusCommentComponent } from './vehicle/vehicle-reception/work-status/work-status-comment/work-status-comment.component';
import { WorkMaintenanceItemComponent } from './vehicle/vehicle-repair/work-maintenance/work-maintenance-item/work-maintenance-item.component';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';


// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginFileValidateSize);
registerPlugin(FilePondPluginImageExifOrientation);

// registerPlugin(FilePondPluginImagePreview);

@NgModule({
  declarations: [
    DialogCarPhotoDialog,
    DialogPrintReceptionDialog,
    WorkshopComponent,
    ClientComponent,
    ClientEditComponent,
    CompanyComponent,
    ClientNoteComponent,
    VehicleComponent,
    ClientVehicleComponent,
    ClientVehicleComponent,
    CompanyEditComponent,
    CompanyNoteComponent,
    CompanyVehicleComponent,
    VehicleRepairComponent,
    VehicleEditComponent,
    VehicleListComponent,
    WorkHeaderComponent,
    WorkTodoRepairComponent,
    WorkTodoItemRepairComponent,
    WorkThirdpartyComponent,
    WorkMaterialsComponent,
    WorkAccesoriesComponent,
    WorkQaComponent,
    WorkMaintenanceComponent,
    VehicleReceptionComponent,
    WorkStatusComponent,
    WorkTodoComponent,
    VehicleHistoryComponent,
    WorkResumeComponent,
    WorkDocumentsComponent,
    WorkPhotosComponent,
    VehicleResumeComponent,
    ReceptionComponent,
    WorkTodoItemComponent,
    WorkStatusCommentComponent,
    WorkMaintenanceItemComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    WorkshopRoutingModule,
    CoreModule,
    PartialsModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    SweetAlert2Module,
    FormsModule,
    FilePondModule,
    MatRadioModule,
    MatCardModule,
    MatMenuModule,
    PdfJsViewerModule
  ],
  entryComponents: [
    DialogCarPhotoDialog,
    DialogPrintReceptionDialog
  ]
})
export class WorkshopModule {
}
