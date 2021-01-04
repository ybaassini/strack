import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ConstatService, PosteService } from "app/@core/api";
import { RISKS } from "app/@core/mock";

@Component({
  selector: "ngx-constat",
  styleUrls: ["./constat.component.scss"],
  templateUrl: "./constat.component.html",
})
export class ConstatComponent implements OnInit {
  public risks = RISKS;
  public form: FormGroup;
  public poste;
  public constat;
  public editMode = false;

  constructor(
    public fb: FormBuilder,
    public posteService: PosteService,
    public constatService: ConstatService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: new FormControl(),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      semaine: new FormControl(),
      type: new FormControl('', Validators.required),
      typeRisk: new FormControl(),
      rank: new FormControl('', Validators.required),
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
    this.route.params.subscribe(params => {
      // this.poste = this.posteService.$posteInProgress.getValue();
      this.poste = JSON.parse(localStorage.getItem('poste'));
      if (params.constatId) {
        this.constat = this.poste.constats.filter(constat => constat.id == params.constatId)[0];
        this.form.patchValue(this.constat);
        this.editMode = true;
      }
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // this.constatService
    //   .createConstat(this.poste.id, this.form.value)
    //   .subscribe((res: any) => {
    //     this.posteService.updatePosteInProgress(res.data.data);
    //     this.router.navigate(['pages/poste']);
    //   });
    const id = uuidv4();
    const constat = {...this.form.value, id }
    this.constatService.createConstat(this.poste.id, constat);
    this.router.navigate(['pages/poste']);
  }

  update() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // this.constatService
    //   .updateConstat(this.poste.id, this.form.value)
    //   .subscribe((res: any) => {
    //     this.posteService.updatePosteInProgress(res.data.data);
    //     this.router.navigate(['pages/poste']);
    //   });

    this.constatService.updateConstat(this.poste.id, this.form.value)
    this.router.navigate(['pages/poste']);
  }

  solde() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.form.get('finished').setValue(true);
    // this.constatService
    //   .updateConstat(this.poste.id, this.form.value)
    //   .subscribe((res: any) => {
    //     this.posteService.updatePosteInProgress(res.data.data);
    //     this.router.navigate(['pages/poste']);
    //   });
    this.constatService.updateConstat(this.poste.id, this.form.value)
    this.router.navigate(['pages/poste']);
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}