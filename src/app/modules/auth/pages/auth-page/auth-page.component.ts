import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent{

  errorLogin: boolean = false;

  constructor(private authService: AuthService,
    private router: Router
  ) {
    console.log('AuthPageComponent created');
  }

  formLogin = new FormGroup({
      email: new FormControl('',
        [Validators.required,
        Validators.email]
      ),
        password: new FormControl('',
        [Validators.required,
        Validators.minLength(6)]
        )
    });

  sendLogin() {
    if (this.formLogin.valid) {
      const { email, password } = this.formLogin.value;
      this.authService.sendCredentials(email!, password!)
      .subscribe({
        next: (response) => {
          console.log('Login succesful', response);
          this.router.navigate(['/']);
          this.errorLogin = false;
        },
        error: (error) => {
          console.log('Login Failed', error);
          this.errorLogin = true;
        }
      });
    } else {
      this.formLogin.markAllAsTouched();
      console.log('Form is invalid')
    }
  }

}
