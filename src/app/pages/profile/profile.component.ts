import { Component, inject } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { IUser } from '../../interfaces/user.interface';
import { Store } from '@ngrx/store';
import { IStore } from '../../interfaces/store.interface';
import { IActivity } from '../../interfaces/activity.interface';
import { activitiesSelector } from '../../store/activity/selectors';
import { DatePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profile: IUser;

  private readonly store: Store<IStore> = inject(Store);

  readonly activities$ = this.store.select(activitiesSelector);

  activities: IActivity[] = [];

  constructor(private localService: LocalService) {
    const stringUser = this.localService.getData('auth_token');
    this.profile = JSON.parse(stringUser);

    this.activities$.subscribe((data) => {
      this.activities = data.filter((item) => item.userId === this.profile.id);
    });
  }
}
