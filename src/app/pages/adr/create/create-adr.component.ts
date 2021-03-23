import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AdrService } from "app/@core/api";
import { LocalStorageService } from "app/@core/services/local-storage.service";
import { commentaireAjouterSiControleConnu } from "app/@core/services/validators.service";

@Component({
  selector: "ngx-create-adr",
  templateUrl: "./create-adr.component.html",
  styleUrls: ["./create-adr.component.scss"],
})
export class AdrCreateComponent implements OnInit {
  public form: FormGroup;
  public zones;
  public submitted = false;

  constructor(
    private localStorageService: LocalStorageService,
    private adrService: AdrService,
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
        adr: ["", Validators.required],
        local: "",
        conforme: false,
        commentaire: "",
      },
      {
        validators: commentaireAjouterSiControleConnu(),
      }
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
    this.adrService
      .createAdr(this.form.value)
      .subscribe(() => this.router.navigate(["/pages/adrs"]));
  }
}
