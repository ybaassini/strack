import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: "ngx-menu",
  styleUrls: ["./menu.component.scss"],
  templateUrl: "./menu.component.html",
})
export class MenuComponent {
  public items = [
    {
      title: 'Poste',
      icon: 'edit-outline',
      link: '/pages/poste',
    },
    {
      title: 'Appui/Conseil Facilitation',
      icon: 'edit-outline',
      link: '/pages/appui-conseils',
    },
    {
      title: 'Ouverture/Fermeture Chantier',
      icon: 'car-outline',
      link: '/pages/chantiers',
    },
    {
      title: 'ADR Incendie 2ème niveau',
      icon: 'edit-outline',
      link: '/pages/adrs',
    },
    {
      title: 'PDF',
      icon: 'edit-outline',
      link: '/pages/pdfs'
    },
    {
      title: 'Ouverture/Fermeture de Plancher',
      icon: 'edit-outline',
      link: '/pages/planchers',
    },
    {
      title: 'PP86',
      icon: 'edit-outline'
    },
    {
      title: 'Di 82',
      icon: 'edit-outline',
      link: '/pages/di82s',
    },
    {
      title: 'Evenements',
      icon: 'edit-outline',
      link: '/pages/poste',
    },
    {
      title: 'Cartographies',
      icon: 'map-outline',
      link: '/pages/cartographies',
    },
    {
      title: 'Surveillance Argos',
      icon: 'eye-outline',
    },
    {
      title: 'Point Materiel',
      icon: 'edit-outline',
      link: '/pages/materiels',
    },
    {
      title: 'Relevés Chaines KRT',
      icon: 'edit-outline',
      link: '/pages/releves/krt'
    },
    {
      title: 'Relevés Balises',
      icon: 'edit-outline',
      link: '/pages/releves/balise',
    },
    {
      title: 'Relevés C2',
      icon: 'edit-outline',
      link: '/pages/releves/c2',
    },
    {
      title: 'Consignes',
      icon: 'edit-outline',
      link: '/pages/consignes',
    },
  ]

  constructor(
    private themeService: NbThemeService,
    public activatedRoute: ActivatedRoute
  ) {
  }

}
