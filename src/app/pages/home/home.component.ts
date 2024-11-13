import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { IStore } from '../../interfaces/store.interface';
import { LocalService } from '../../services/local.service';
import { usersSelector } from '../../store/user/selectors';
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs';
import { productsSelector } from '../../store/product/selectors';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly store: Store<IStore> = inject(Store);

  readonly users$ = this.store.select(usersSelector);
  readonly products$ = this.store.select(productsSelector);

  users: number = 0;
  products: number = 0;

  constructor(private localService: LocalService) {}

  ngOnInit() {
    this.users$.subscribe((users) => {
      this.users = users.length;
    });
    this.products$.subscribe((products) => {
      this.products = products.length;
    });
  }

  generateGreetMessage() {
    const stringUser = this.localService.getData('auth_token');
    const user: IUser = JSON.parse(stringUser);

    let greet = '';
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      greet = 'Good morning';
    } else if (currentHour < 18) {
      greet = 'Good afternoon';
    } else {
      greet = 'Good evening';
    }

    return `${greet}, ${user.name}`;
  }
}
