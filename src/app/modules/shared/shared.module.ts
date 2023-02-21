
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { PageForbiddenComponent } from 'src/app/components/shared/page-forbidden/page-forbidden/page-forbidden.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import {ProgressBarModule} from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';
import { QRCodeModule } from 'angularx-qrcode';

import { PdfViewerComponent } from 'src/app/components/shared/pdf/pdf-viewer/pdf-viewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

import { CheckboxModule } from 'primeng/checkbox';
import { ChangePasswordComponent } from 'src/app/components/shared/change-password/change-password/change-password.component';



import { ConfirmDialogModule } from 'primeng/confirmdialog';


import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    PdfViewerComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    TabViewModule,
    NgxBarcodeModule,
    NgxDocViewerModule,
    CheckboxModule,
    QRCodeModule,
    CardModule,
    ConfirmDialogModule,
    ProgressBarModule,
    FlexLayoutModule,
    FlexLayoutModule,
    ButtonModule,
    TabViewModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    TableModule,
    DropdownModule,
    CheckboxModule,
    ConfirmDialogModule,
    FormsModule,
    InputNumberModule,
    InputTextareaModule
  ],
  exports: [
    PdfViewerComponent,
  ],
})
export class SharedModule {}
