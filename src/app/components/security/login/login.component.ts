import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/security/login.model';
import { LoginService } from 'src/app/services/security/login/login.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  dateToday: any = new Date();
  constructor(
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {
    this.dateToday = this.datePipe.transform(this.dateToday, 'MM/dd/yyyy');
  }

  isProcessing: boolean = false;
  loginModel: LoginModel = {
    username: "",
    password: ""
  };

  inputFocus() {
    document.getElementById('email')?.focus();
  }

  signIn(e: any) {
    console.log(e);
    this.isProcessing = true;
    let date_now: any = this.datePipe.transform(new Date(this.dateToday), 'MM/dd/yyyy')
    this.loginService.userlogin(this.loginModel).subscribe(
      response => {
        let result = response;
        if (result[0] == true) {
          localStorage.setItem('token', result[1].token);
          localStorage.setItem('user_id', result[1].data.id);
          localStorage.setItem('warehouse_id', result[1].data.warehouse_id);
          localStorage.setItem('user_type', result[1].data.user_type);
          localStorage.setItem('email', result[1].data.email);
          localStorage.setItem('dateToday', date_now);
          this.messageService.add({
            severity: 'success',
            // summary: 'Login Successful',
            detail: 'Login success'
          })
          location.replace('/dashboard');
        } else {
          this.messageService.add({
            severity: 'error',
            // summary: 'Login Failed',
            detail: result[1].error.message
          });
          this.isProcessing = false;
        }
      });
  }

  ngOnInit(): void {
    this.inputFocus();
  }
}
