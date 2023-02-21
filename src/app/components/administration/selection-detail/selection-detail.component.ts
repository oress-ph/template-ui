import { Component, OnInit } from '@angular/core';
import { SelectionModel } from 'src/app/models/administration/selection.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectionService } from 'src/app/services/administration/selection/selection.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-selection-detail',
  templateUrl: './selection-detail.component.html',
  styleUrls: ['./selection-detail.component.scss'],
})
export class SelectionDetailComponent implements OnInit {
  constructor(
    private dialogRef: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private selectionService: SelectionService,
    private messageService: MessageService
  ) { }

  selectionModel: SelectionModel = new SelectionModel();
  isProcessing: boolean = false;

  isComponentShown: boolean = false;

  save() {
    if (this.selectionModel.id == 0) {
      this.selectionService.addSelection(this.selectionModel).subscribe({
        next: (response: any) => {
          let result = response;
          if (result[0] == true) {

            this.messageService.add({
              severity: 'success',
              summary: '200',
              detail: 'Added Successfully',
            });
            this.dialogRef.close(200);
          } else {

            this.messageService.add({
              severity: result[1] == 401 ? 'info' : 'error',
              summary: result[1],
              detail: result[1] == 401 ? 'Unauthorized' : 'Server Error',
            });
          }
        },
      });
    } else {
      this.selectionService.updateSelection(this.selectionModel.id, this.selectionModel).subscribe({
        next: (response: any) => {

          let result = response;
          if (result[0] === true) {

            this.messageService.add({
              severity: 'success',
              summary: '200',
              detail: 'Updated Successfully',
            });
            this.dialogRef.close(200);
          } else {

            this.dialogRef.close('failed');
            this.messageService.add({
              severity: result[1] == 401 ? 'info' : 'error',
              summary: result[1],
              detail: result[1] == 401 ? 'Unauthorized' : 'Server Error',
            });
          }
        },
      });
    }
  }

  loadSelectionDetails() {
    this.selectionModel = this.dynamicDialogConfig.data.data;
    setTimeout(() => {
      this.isComponentShown = true;
    }, 500);
  }

  closeSelection() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.dynamicDialogConfig.data) {
      this.loadSelectionDetails();
    }
  }
}
