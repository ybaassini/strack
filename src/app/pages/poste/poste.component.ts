import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PosteService } from 'app/@core/api';

@Component({
  selector: "ngx-poste",
  templateUrl: "./poste.component.html",
  styleUrls: ["./poste.component.scss"],
})
export class PosteComponent {
  public posteInProgress;
  public postesFinished;
  constructor(
    public posteService: PosteService,
    public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // this.activatedRoute.data.subscribe((res) => {
    //   this.postesFinished = res.postes.data.data.filter(
    //     (poste) => poste.status === "finished"
    //   );
    //   this.posteInProgress = res.postes.data.data.filter(
    //     (poste) => poste.status === "in progress"
    //   )[0];
    // });
    const postes = JSON.parse(localStorage.getItem('postes')) || [];
    const posteInProgress = JSON.parse(localStorage.getItem('poste'));
    this.postesFinished = postes.filter(
      (poste) => poste.status === "finished" && poste.zone == posteInProgress.zone && poste.projet == posteInProgress.projet
    );
    this.posteInProgress = postes.filter(
      (poste) => poste.status === "in progress" && poste.zone == posteInProgress.zone && poste.projet == posteInProgress.projet
    )[0];
  }
}
