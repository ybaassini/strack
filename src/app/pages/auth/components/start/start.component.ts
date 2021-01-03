import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  NbAuthBlockComponent,
  NbAuthService,
  NbLoginComponent,
} from "@nebular/auth";
import { PosteService } from 'app/@core/api';
import { PROJETS, ZONES } from 'app/@core/mock';
import { AuthService } from "app/@core/services/auth.service";
import { defaultSettings } from "../../settings.const";

@Component({
  selector: "auth-start",
  templateUrl: "./start.component.html",
})
export class StartComponent extends NbLoginComponent {
  public poste = {
    email: this.authService.user.getValue().email,
    fullName: `${this.authService.user.getValue().firstName} ${this.authService.user.getValue().firstName}`,
    zone: '',
    label: '',
    date: '',
    projet: '',
  };
  public projets = PROJETS;
  public zones = ZONES;

  constructor(
    public service: NbAuthService,
    public cd: ChangeDetectorRef,
    public router: Router,
    public authService: AuthService,
    public posteService: PosteService
  ) {
    super(service, defaultSettings, cd, router);
  }

  start() {
    this.posteService.createPoste(this.poste).subscribe(() => {
      localStorage.setItem('poste', JSON.stringify(this.poste));
      this.router.navigate(['pages/dashboard']);
    });

  }
}
