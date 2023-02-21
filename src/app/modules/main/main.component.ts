import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  items: MenuItem[] = [];
  subItems: MenuItem[] = [];

  ngOnInit(): void {
    // this.items = [
    //   { label: 'HOME', routerLink: "/main/home" },
    //   { label: 'APPLY JOBS', routerLink: "/main/home" },
    //   { label: 'ABOUT'},
    //   { label: 'OUR PARTNERS'},
    //   { label: 'CONTACT US'}
    // ];
    // this.subItems = [
    //   { label: 'Our Services', routerLink: "/main/home" },
    //   { label: 'Our Partners', routerLink: "/main/home" },
    //   { label: 'Applications', routerLink: "/main/home" },
    // ]
  }
}