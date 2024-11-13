import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductComponent } from './pages/product/product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { accountGuard } from './guards/account.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home Page',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    title: 'Login Page',
    component: LoginComponent,
    canActivate: [accountGuard]
  },
  {
    path: 'product',
    title: 'Product Page',
    component: ProductComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    title: 'Profile Page',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    title: 'Not Found Page',
    component: NotFoundComponent,
  },
];
