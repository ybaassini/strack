import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Di82Service } from "app/@core/api";
import { LocalStorageService } from "app/@core/services/local-storage.service";
import { commentaireAjouterSiControleConnu } from "app/@core/services/validators.service";

@Component({
  selector: "ngx-create-di82",
  templateUrl: "./create-di82.component.html",
  styleUrls: ["./create-di82.component.scss"],
})
export class Di82CreateComponent implements OnInit {
  public form: FormGroup;
  public zones;
  public submitted = false;
  constructor(
    private localStorageService: LocalStorageService,
    private di82Service: Di82Service,
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((res) => {
      this.zones = res.zones.data.data;
    });
    this.form = this.fb.group(
      {
        date: [new Date()],
        rapporteur: this.localStorageService.getItem("user").email,
        zone: this.localStorageService.getItem("poste").zone.id,
        projet: this.localStorageService.getItem("poste").projet.id,
        numero: ["", Validators.required],
        commentaire: "",
        conforme: false,
      },
      {
        validators: commentaireAjouterSiControleConnu(),
      },
    );
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.di82Service
      .createDi82(this.form.value)
      .subscribe(() => this.router.navigate(["/pages/di82s"]));
  }
}
