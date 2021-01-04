import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbAuthService, NbRegisterComponent } from "@nebular/auth";
import { AuthService } from "app/@core/services/auth.service";
import { defaultSettings } from "../../settings.const";

@Component({
  selector: "auth-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent extends NbRegisterComponent {
  constructor(
    public service: NbAuthService,
    public cd: ChangeDetectorRef,
    public router: Router,
    public authService: AuthService
  ) {
    super(service, defaultSettings, cd, router);
  }

  public register() {
    // this.authService.register(this.user).subscribe(
    //   (res) => {
    //     this.authService.setLocalStorage(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const id = uuidv4();
    const userToSave = {...this.user, id};
    this.authService.user.next(userToSave);
    users.push(userToSave);
    localStorage.setItem('user', JSON.stringify(userToSave));
    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['/auth/start']);
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}