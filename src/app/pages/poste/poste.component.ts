import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PosteDto, PosteService } from "app/@core/api";

@Component({
  selector: "ngx-poste",
  templateUrl: "./poste.component.html",
  styleUrls: ["./poste.component.scss"],
})
export class PosteComponent implements OnInit {
  public posteInProgress;
  public postesFinished;
  constructor(
    public posteService: PosteService,
    public activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((res) => {
      this.postesFinished = res.postes.data.filter(
        (poste) => poste.status !== PosteDto.StatusEnum.InProgress,
      );

      this.posteInProgress = res.postes.data
      .filter(
        (poste) => poste.status === PosteDto.StatusEnum.InProgress,
      )
      .pop();
    });
  }
}
