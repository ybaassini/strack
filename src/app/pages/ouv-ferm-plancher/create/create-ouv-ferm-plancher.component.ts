import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PlancherService } from "app/@core/api";
import { LocalStorageService } from "app/@core/services/local-storage.service";
import { commentaireAjouterSiControleConnu } from "app/@core/services/validators.service";

@Component({
  selector: "ngx-create-plancher",
  templateUrl: "./create-ouv-ferm-plancher.component.html",
  styleUrls: ["./create-ouv-ferm-plancher.component.scss"],
})
export class PlancherCreateComponent implements OnInit {
  public form: FormGroup;
  public zones;
  public submitted = false;
  constructor(
    private localStorageService: LocalStorageService,
    private plancherService: PlancherService,
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      date: [new Date()],
      rapporteur: this.localStorageService.getItem('user').email,
      zone: this.localStorageService.getItem('poste').zone.id,
      projet: this.localStorageService.getItem('poste').projet.id,
      numero: ['', Validators.required],
      ouverture: true,
      conforme: true,
      commentaire: [''],
      poste: this.localStorageService.getItem('poste').id,
    }, {
      validators: commentaireAjouterSiControleConnu(),
    });
  }

  ngOnInit() {
    this.route.data.subscribe((res) => {
      this.zones = res.zones.data.data;
    });

  }  

  get f() { return this.form.controls; }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.plancherService.createPlancher(this.form.value).subscribe(() => this.router.navigate(['/pages/planchers']));
  }
}
