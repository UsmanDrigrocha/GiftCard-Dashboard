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
    private router: Router
  ) {}
  ngOnInit(): void {}

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
        localStorage.setItem('token',  data.data.token);
        this.utilityService.showSnackbar(data.message);
        this.navigateToHome()
      },
      (error: any) => {
        return this.utilityService.showSnackbar('Error occurred while logging');
      }
    );
  }

  navigateToHome(){
    this.router.navigate(['/dashboard']);
  }
}
