import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginInvalid = false;
  constructor(private titleService:Title,private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('lam dep trai');
  }

  signup(formValues) {
    this.authService.signup(formValues.email, formValues.password)
      .subscribe(result => {
        if (!result) {
          this.loginInvalid = true;
        } else {
          this.loginInvalid = false;
          this.router.navigate(['/']);
        }
      });
  }
}
