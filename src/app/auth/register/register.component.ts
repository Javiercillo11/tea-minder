import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegisterService } from '../../data/register.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  myForm: FormGroup;

  constructor(private userService: RegisterService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  sendForm() {
    if (this.myForm.valid) {
      const user: User = this.myForm.value as User;
      this.userService.registerUser(user).subscribe(
        () => {
          console.log('Usuario registrado exitosamente');
          this.myForm.reset();
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }
}
