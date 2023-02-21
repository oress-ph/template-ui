import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  constructor(
    public dialogService: DialogService,
    private dynamicDialogConfig: DynamicDialogConfig,
  ) { }
  pdfURL: string = '';
  pdf(){
    let binaryData = [];
    binaryData.push(this.dynamicDialogConfig.data.data);
    this.pdfURL = URL.createObjectURL(
      new Blob(binaryData,{ type: 'application/pdf' })
      )
  }
  ngOnInit(): void {
    this.pdf();
  }

}
