import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ChantierService } from "app/@core/api";
import { LocalStorageService } from "app/@core/services/local-storage.service";

@Component({
  selector: "ngx-create-ouv-ferm-chantier",
  templateUrl: "./create-ouv-ferm-chantier.component.html",
  styleUrls: ["./create-ouv-ferm-chantier.component.scss"],
})
export class ChantierCreateComponent implements OnInit {
  public form: FormGroup;
  public zones;
  constructor(
    private localStorageService: LocalStorageService,
    private chantierService: ChantierService,
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
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
      ouverture: true,
      contact: '',
    });
  }

  submit() {
    this.chantierService.createChantier(this.form.value).subscribe(() => this.router.navigate(['/pages/chantiers']));
  }
}
