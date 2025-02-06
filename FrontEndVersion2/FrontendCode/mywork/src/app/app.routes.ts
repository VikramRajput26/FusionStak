import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { PageNotFoundComponentComponent } from './component/page-not-found-component/page-not-found-component.component';

import { SignInComponent } from './webcomponents/sign-in/sign-in.component';

import { AuthComponent } from './services/auth/auth.component';
import { ChildregisterComponent } from './webcomponents/childregister/childregister.component';
import { AppointmentComponent } from './webcomponents/appointment/appointment.component';
import { SignUpComponent } from './webcomponents/sign-up/sign-up.component';
import { UserComponent } from './webcomponents/user/user.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'childregister', component: ChildregisterComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
