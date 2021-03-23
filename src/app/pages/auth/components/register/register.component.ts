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
    this.authService.register(this.user).subscribe(
      (res) => {
        this.authService.setLocalStorage(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
