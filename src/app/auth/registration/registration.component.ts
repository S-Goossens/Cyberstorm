import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Handles form submission
   */
  onSubmit() {
    this.authService.signup(this.registrationForm.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/products']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
  }

  /**
   * Initialize the registration form
   */
  private initForm() {
    this.registrationForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
        ]),
        street: new FormControl(null, [Validators.required]),
        number: new FormControl(null, [Validators.required]),
        postalCode: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        region: new FormControl(null, [Validators.required]),
        country: new FormControl(null, [Validators.required]),
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  /**
   * Validates whether the password and the password confirmation field have equal values
   * @param form The form to check the passwords for
   */
  private passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value ===
      form.controls['confirmPassword'].value
      ? null
      : { mismatch: true };
  }
}
