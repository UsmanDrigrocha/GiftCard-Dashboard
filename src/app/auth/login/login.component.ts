import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private utilityService: UtilityService,
    private authService: AuthService,
    private router: Router,
    private location:Location
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  user = {
    email: '',
    password: '',
  };

  login() {
    if (!this.user.email || !this.user.password) {
      return this.utilityService.showSnackbar('Enter All Fields !');
    }
    if (!this.utilityService.isValidEmail(this.user.email)) {
      return this.utilityService.showSnackbar('Invalid email format');
    }

    this.authService.login(this.user.email, this.user.password).subscribe(
      (data: any) => {
        if (data.status === false) {
          return this.utilityService.showSnackbar(data.errors[0]);
        }
        localStorage.setItem('token', data.data.token);
        this.utilityService.showSnackbar(data.message);
        window.location.reload()
      },
      (error: any) => {
        return this.utilityService.showSnackbar('Error occurred while logging');
      }
    );
  }


  // ---------------------------------------------- Password Logic ----------------------------------------------

  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
