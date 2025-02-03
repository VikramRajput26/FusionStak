import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { PageNotFoundComponentComponent } from './component/page-not-found-component/page-not-found-component.component';
import { PostsComponent } from './component/posts/posts.component';
import { AddPostComponent } from './component/addpost/addpost.component';
import { UpdatePostComponent } from './component/updatepost/updatepost.component';
import { DeletePostComponent } from './component/deletepost/deletepost.component';
import { SignInComponent } from './webcomponents/sign-in/sign-in.component';
import { SignUpComponent } from './webcomponents/sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'addpost', component: AddPostComponent },
  { path: 'updatepost', component: UpdatePostComponent },
  { path: 'deletepost', component: DeletePostComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
