import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/app-settings';
import { WarehouseService } from 'src/app/services/administration/warehouse/warehouse.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('topbarMenu') topbarMenu!: ElementRef;

  company_logo: string = this.appSettings.company_logo;

  hide: boolean = true;

  user_email: any = localStorage.getItem('email');
  dateToday: any = localStorage.getItem('dateToday');
  user_type: any = localStorage.getItem('user_type');
  warehouse_id: any = localStorage.getItem('warehouse_id');
  warehouse: string = 'Warehouse';
  constructor(
    private router: Router,
    private warehouseService: WarehouseService,
    private appSettings: AppSettings
  ) {

  }

  logout() {
    localStorage.clear();
    location.reload();
  }

  onMenuButtonClick(event: Event) {
    this.hide = !this.hide;
    this.menuButtonClick.emit();
    event.preventDefault();
  }
  ngOnInit() {
    let warehouse_id = this.warehouse_id;
    setTimeout(() => {
      this.warehouseService.getWarehouseById(warehouse_id).subscribe(
        response => {
          let result = response;
          if (result[0] == true) {
            let warehouse = result[1]
            this.warehouse = warehouse.warehouse;
            localStorage.setItem('warehouse', JSON.stringify(warehouse))
          }
        }
      )
    }, 500);
  }
}
