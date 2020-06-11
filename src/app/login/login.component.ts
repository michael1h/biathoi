import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin = false;

  constructor(private titleService:Title,   private authService: AuthService, private router: Router) {
    
  }

  ngOnInit() {
    this.titleService.setTitle("Some title");
  }

  login(formValues) {
    this.invalidLogin = false;
    this.authService.login(formValues.email, formValues.password)
      .subscribe(result => {
        if (!result) {
          console.log('login.component user not found');
          this.invalidLogin = true;
        } else {
          console.log('login.component logged in. redirecting to home page');
          this.invalidLogin = false;
          this.router.navigate(['/']);
        }
      });
  }
}
