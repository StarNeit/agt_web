import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormsModule,
  Validators
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, tap } from 'rxjs';

import { NgIf } from '@angular/common';
import { IStore } from '../../interfaces/store.interface';
import { usersSelector } from '../../store/user/selectors';
import { LocalService } from '../../services/local.service';
import * as ActivityActions from '../../store/activity/actions';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatButton,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _snackBar = inject(MatSnackBar);

  private readonly store: Store<IStore> = inject(Store);

  readonly users$ = this.store.select(usersSelector);

  constructor(private localService: LocalService) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    const value = this.loginForm.value;

    this.users$.pipe(
      map(users => users.find((user) => user.email === value.email)),
      tap(user => {
        if (!user) {
          this._snackBar.open("Email doesn't exist");
        } else if (user.password !== value.password) {
          this._snackBar.open("Password is incorrect");
        } else {
          this.localService.saveData('auth_token', JSON.stringify(user));
          this.store.dispatch(ActivityActions.addActivity({
            value: {
              userId: user.id,
              time: new Date().toISOString(),
              content: 'Logged In'
            }
          }));
          window.location.href = '/home';
        }
      })
    ).subscribe();
  }
}
