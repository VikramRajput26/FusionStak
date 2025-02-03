import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { PageNotFoundComponentComponent } from './component/page-not-found-component/page-not-found-component.component';

import { SignInComponent } from './webcomponents/sign-in/sign-in.component';
import { SignUpComponent } from './webcomponents/sign-up/sign-up.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
