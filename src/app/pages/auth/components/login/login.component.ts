import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  NbAuthBlockComponent,
  NbAuthService,
  NbLoginComponent,
} from "@nebular/auth";
import { AuthService } from "app/@core/services/auth.service";
import { defaultSettings } from "../../settings.const";

@Component({
  selector: "auth-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent extends NbLoginComponent {
  constructor(
    public service: NbAuthService,
    public cd: ChangeDetectorRef,
    public router: Router,
    public authService: AuthService
  ) {
    super(service, defaultSettings, cd, router);
  }

  public ngOnInit() {}

  public login() {
    this.authService.login(this.user).subscribe(
        (res: any) => {
          this.authService.setLocalStorage(res);
          this.authService.saveUser(res.data.user);
          this.router.navigate(['/auth/start']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
