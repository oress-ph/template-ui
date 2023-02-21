import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {



  constructor(
    private appSettings: AppSettings
  ) { }
  company_logo: string = this.appSettings.company_logo;

  items: MenuItem[] = [];

  ngOnInit(): void {
  }
}
