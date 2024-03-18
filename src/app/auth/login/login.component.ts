import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../data/user.service';
import { UserInfoService } from '../../data/user-info.service';
import { TeaService } from '../../data/teas.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  myForm: FormGroup;
  loading = false;

  constructor(
    private authService: UserInfoService,
    private userService: UserService,
    private teaService: TeaService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  public onLogin(): void {
    if (this.myForm.valid) {
      const { email, password } = this.myForm.value;
      this.userService.login(email, password).subscribe(user => {
        if (user.user) {
          this.authService.login(email, password);
          /* this.loadUserTeas(email); */
          this.fakeLoading();
        } else {
          this.error();
          this.myForm.reset();
        }
      });
    }
  }

  error() {
    this._snackBar.open('Usuario o contraseña incorrectos', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['pages']);
    }, 1500);
  }
/* 
  loadUserTeas(email: string): void {
    // Obtén el ID de usuario utilizando el servicio UserService
    this.userService.getUserByEmail(email).subscribe(user => {
      if (user) {
        // Si se encuentra el usuario, carga los "Teas" asociados a su ID
        this.teaService.getTeasByUserId(user.id).subscribe(teas => {
          console.log('Teas del usuario:', teas);
          // Aquí puedes hacer lo que necesites con los "Teas" del usuario
        });
      }
    });
  } */
}
