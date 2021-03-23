import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PosteService } from "app/@core/api";
import { CHANTIERAENJEU } from "app/@core/constants/chantier.const";
import { LocalStorageService } from "app/@core/services/local-storage.service";

@Component({
  selector: "ngx-constat",
  styleUrls: ["./constat.component.scss"],
  templateUrl: "./constat.component.html",
})
export class ConstatComponent implements OnInit {
  public form: FormGroup;
  public poste;
  public constat;
  public editMode = false;
  public chantiersAEnjeu = [];
  public risques = [];

  constructor(
    public fb: FormBuilder,
    public posteService: PosteService,
    public route: ActivatedRoute,
    public router: Router,
    public localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    this.chantiersAEnjeu = CHANTIERAENJEU;
    this.poste = this.localStorageService.getItem('poste');
    this.initForm();
    this.getParams();
    this.getData();
  }

  public getData() {
    this.route.data.subscribe(data => {
      this.risques = data.risques.data.data;
    });
  }

  /**
   * getParams
   */
  public getParams() {
    this.route.params.subscribe((params) => {
      if (params.constatId) {
        this.posteService.getConstat(params.constatId).subscribe((res) => {
          const constat = {...res.data, date: new Date(res.data.date), time: new Date(res.data.date)};
          this.form.patchValue(constat);
        });
        this.editMode = true;
      }
    });
  }

  public initForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      date: new FormControl(new Date(), Validators.required),
      time: new FormControl(new Date(), Validators.required),
      semaine: new FormControl(),
      type: new FormControl("", Validators.required),
      typeRisk: new FormControl(),
      rank: new FormControl("", Validators.required),
      company: new FormControl(),
      contact: new FormControl(),
      local: new FormControl(),
      chantier: new FormControl(),
      chantierEnjeu: new FormControl(),
      action: new FormControl(),
      finished: new FormControl(true, Validators.required),
      description: new FormControl(),
      picture: new FormControl(),
      faitMarquant: new FormControl(true, Validators.required),
    });
  }

  public save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.posteService
      .createConstat({posteId: this.poste.id, constat: this.form.value} as any)
      .subscribe((res: any) => {
        // this.posteService.updatePoste(res.data.data);
        this.router.navigate(["pages/poste"]);
      });
  }

  public update() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.posteService
      .updateConstat({posteId: this.poste.id, constat: this.form.value} as any)
      .subscribe((res: any) => {
        // this.posteService.updatePoste(res.data.data);
        this.router.navigate(["pages/poste"]);
      });
  }

}
