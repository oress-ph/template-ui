import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RegisterModel } from 'src/app/models/security/register.model';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/security/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  constructor(
    private registerService: RegisterService,
    private messageService: MessageService,
    private router: Router
  ) { }

  isProcessing: boolean = false;
  registerModel: RegisterModel = new RegisterModel()
  checked: boolean = false;

  public register(): void {
    this.isProcessing = true;
    this.registerService.register(this.registerModel).subscribe(
      data => {
        if (data[0] == true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Register Successful',
            detail: 'You have successfully registered your account.'
          });
          setTimeout(() => {
          this.router.navigate(['/security/login'])
          }, 1500);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Register Failed',
            detail: data[1]
          });

          this.isProcessing = false;
        }
      }
    );
  }

  ngOnInit(): void {
  }
}
