import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  menuActive!: boolean;

  constructor(private router: Router) {}

  onMenuButtonClick() {
      this.menuActive = true;
      this.addClass(document.body, 'blocked-scroll');
  }

  onMaskClick() {
      this.hideMenu();
  }

  hideMenu() {
      this.menuActive = false;
      this.removeClass(document.body, 'blocked-scroll');
  }

  addClass(element: any, className: string) {
      if (element.classList)
          element.classList.add(className);
      else
          element.className += ' ' + className;
  }

  removeClass(element: any, className: string) {
      if (element.classList)
          element.classList.remove(className);
      else
          element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  ngOnInit() {}
}
