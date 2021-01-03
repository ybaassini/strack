import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestPasswordComponent } from './components/request-password/request-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { StartComponent } from './components/start/start.component';

const routes: Routes = [
  {
    path:'',
    component: NbAuthComponent,
    children:[
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'start',
        component: StartComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'request-password',
        component: RequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

export const routedComponents = [
  LoginComponent,
  StartComponent,
  ResetPasswordComponent,
  RequestPasswordComponent,
  LogoutComponent,
  RegisterComponent
];
