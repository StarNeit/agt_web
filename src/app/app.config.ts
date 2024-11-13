import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { reducers as UserReducers } from "./store/user/reducers";
import { reducers as ProductReducers } from "./store/product/reducers";
import { reducers as ActivityReducers } from "./store/activity/reducers";

const store = {
  user: UserReducers,
  product: ProductReducers,
  activity: ActivityReducers
};

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(store),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ]
};
