import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppuiConseilService } from "app/@core/api";
import { LocalStorageService } from "app/@core/services/local-storage.service";

@Component({
  selector: "ngx-create-appui-conseil",
  templateUrl: "./create-appui-conseil.component.html",
  styleUrls: ["./create-appui-conseil.component.scss"],
})
export class AppuiConseilCreateComponent implements OnInit {
  public form: FormGroup;
  public zones;
  constructor(
    private localStorageService: LocalStorageService,
    private appuiConseilService: AppuiConseilService,
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((res) => {
      this.zones = res.zones.data.data;
    });
    this.form = this.fb.group({
      date: [new Date()],
      rapporteur: this.localStorageService.getItem('user').email,
      zone: this.localStorageService.getItem('poste').zone.id,
      projet: this.localStorageService.getItem('poste').projet.id,
      local: '',
      chantier: '',
      commmentaire: '',
    });
  }

  submit() {
    this.appuiConseilService.createAppuiConseil(this.form.value).subscribe(() => this.router.navigate(['/pages/appui-conseils']));
  }
}
