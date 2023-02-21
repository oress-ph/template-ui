import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
            <div class="layout-footer-left">
                <span>BERBEN </span>
                <a href="#">&copy; 2022</a>
            </div>

            <div class="layout-footer-right">
                <a href="#" class="p-mr-3">
                    <i class="pi pi-facebook"></i>
                </a>
                <a href="#" class="p-mr-3">
                    <i class="pi pi-twitter"></i>
                </a>

                <a href="#" target="_blank">
                    <i class="pi pi-youtube"></i>
                </a>
            </div>
        </div>
    `
})
export class AppFooterComponent {
}
