import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConsigneService } from "app/@core/api";
import { LocalStorageService } from "app/@core/services/local-storage.service";

@Component({
  selector: "ngx-create-consigne",
  templateUrl: "./create-consigne.component.html",
  styleUrls: ["./create-consigne.component.scss"],
})
export class ConsigneCreateComponent implements OnInit {
  public form: FormGroup;
  public zones;
  constructor(
    private localStorageService: LocalStorageService,
    private consigneService: ConsigneService,
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
      description: '',
      poste: this.localStorageService.getItem('poste').id,
    });
  }

  submit() {
    this.consigneService.createConsigne(this.form.value).subscribe(() => this.router.navigate(['/pages/consignes']));
  }
}
