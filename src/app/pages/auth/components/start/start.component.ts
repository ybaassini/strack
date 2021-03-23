import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NbAuthBlockComponent,
  NbAuthService,
  NbLoginComponent,
} from "@nebular/auth";
import { PosteService } from "app/@core/api/api/api";
import { CreatePosteDto } from "app/@core/api/model/models";
import { AuthService } from "app/@core/services/auth.service";
import { defaultSettings } from "../../settings.const";

@Component({
  selector: "auth-start",
  templateUrl: "./start.component.html",
})
export class StartComponent extends NbLoginComponent implements OnInit {
  public poste: any = {
    email: this.authService.user.getValue().email,
    fullName: `${this.authService.user.getValue().firstName} ${this.authService.user.getValue().firstName}`,
    zone: '',
    label: '',
    date: new Date(),
    projet: '',
  };
  public projets = [];
  public zones = [];

  constructor(
    public service: NbAuthService,
    public cd: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    public authService: AuthService,
    public posteService: PosteService,
  ) {
    super(service, defaultSettings, cd, router);
  }
  
  public ngOnInit() {
    this.route.data.subscribe((res) => {
      this.projets = res.projets.data.data;
      this.zones = res.zones.data.data;
    })
  }

  public start() {
    if (!this.poste.zone || !this.poste.projet) {
      return;
    }
    this.poste.user = this.authService.user.getValue();
    this.posteService.createPoste(this.poste as CreatePosteDto).subscribe((res: any) => {
      localStorage.setItem('poste', JSON.stringify(res.data));
      this.router.navigate(['pages/dashboard']);
    });
  }
}
