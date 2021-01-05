import {Component, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Constat en cours',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.coffeeMakerCard,
  ];

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

  constats = [];
  constatsInProgress = [];

  constructor(private themeService: NbThemeService,
              public activatedRoute: ActivatedRoute) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

      const posteInProgress = JSON.parse(localStorage.getItem('poste'));
      const postes = JSON.parse(localStorage.getItem('postes'));
      postes
      .filter(poste =>  poste.zone == posteInProgress.zone && poste.projet == posteInProgress.projet)
      .forEach(
        (poste) => {
          this.constats = [
            ...this.constats,
            ...poste.constats
              .filter(constat => constat.faitMarquant == true)
          ]
          this.constatsInProgress = [
            ...this.constatsInProgress,
            ...poste.constats
            .filter(constat => constat.finished == false)
          ]
        }
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
