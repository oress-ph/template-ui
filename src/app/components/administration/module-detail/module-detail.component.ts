import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SystemModuleModel } from 'src/app/models/administration/system-module.model';
import { SystemModuleService } from 'src/app/services/administration/system-module/system-module.service';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss']
})
export class ModuleDetailComponent implements OnInit {

  constructor(
    private systemModuleService: SystemModuleService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
  ) { }

  systemModel: SystemModuleModel = new SystemModuleModel();
  isContentShown : boolean = false;

  save() {
    if(this.systemModel.id == 0) {
      this.systemModuleService.addSystemModule(this.systemModel).subscribe({
        next: (response: any) => {
          let result = response;
          if (result[0] === true) {

            this.messageService.add({
              severity: 'success',
              summary: '200',
              detail: 'Added Successfully',
            });
            
            this.ref.close(200);
          } else {

            this.messageService.add({
              severity: result[1] == 401 ? 'info' : 'error',
              summary: result[1],
              detail: result[1] == 401 ? 'Unauthorized' : 'Server Error',
            });
          }
        }
      })
    } else {
      this.systemModuleService.updateSystemModule(this.systemModel.id, this.systemModel).subscribe({
        next: (response: any) => {
          let result = response;
          if (result[0] === true) {

            this.messageService.add({
              severity: 'success',
              summary: '200',
              detail: 'Updated Successfully',
            });
            this.ref.close(200);
          } else {
            
            this.ref.close('failed')
            this.messageService.add({
              severity: result[1] == 401 ? 'info' : 'error',
              summary: result[1],
              detail: result[1] == 401 ? 'Unauthorized' : 'Server Error',
            });
          }
        }
      })
    }
  }

  loadModuleDetails() {
    this.systemModel = this.config.data.data;
    setTimeout(() => {
      this.isContentShown  = true;
    }, 500);
  }
  
  ngOnInit(): void {
    if(this.config.data) {
      this.loadModuleDetails();
    }
  }
}
