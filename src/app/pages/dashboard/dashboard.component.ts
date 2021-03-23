import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbThemeService } from "@nebular/theme";
import { ConsigneDto, MaterielDto, PosteDto } from "app/@core/api";
import { takeWhile } from "rxjs/operators";

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit, OnDestroy {
  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: "Light",
    iconClass: "nb-lightbulb",
    type: "primary",
  };
  rollerShadesCard: CardSettings = {
    title: "Roller Shades",
    iconClass: "nb-roller-shades",
    type: "success",
  };
  wirelessAudioCard: CardSettings = {
    title: "Wireless Audio",
    iconClass: "nb-audio",
    type: "info",
  };
  coffeeMakerCard: CardSettings = {
    title: "Constat en cours",
    iconClass: "nb-coffee-maker",
    type: "warning",
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [this.coffeeMakerCard];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: this.commonStatusCardsSet,
    dark: this.commonStatusCardsSet,
  };

  public constatsMarquant = [];
  public constatsInProgress = [];
  public materielsInProgress = [];
  public consignesInProgress = [];

  constructor(
    private themeService: NbThemeService,
    public activatedRoute: ActivatedRoute,
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.initConstats(data.postes.data);
      this.initMateriels(data.materiels.data);
      this.initConsignes(data.consignes.data);
    })
  }

  public initConstats(postes) {
    postes.forEach(poste => {
      poste.constats.forEach(constat => {
        if (!constat.finished) {
          this.constatsInProgress.push(constat);
        }
        if (constat.faitMarquant) {
          this.constatsMarquant.push(constat);
        }
      });
    });
  }

  public initMateriels(materiels) {
    materiels.forEach(materiel => {
      if (materiel.status === MaterielDto.StatusEnum.InProgress) {
        this.materielsInProgress.push(materiel);
      }
    });
  }

  public initConsignes(consignes) {
    consignes.forEach(consigne => {
      if (consigne.status === ConsigneDto.StatusEnum.InProgress) {
        this.consignesInProgress.push(consigne);
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
