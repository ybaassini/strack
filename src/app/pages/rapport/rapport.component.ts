import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AdrDto,
  AdrService,
  ChantierDto,
  ChantierService,
  ConsigneDto,
  ConsigneService,
  ConstatDto,
  Di82Dto,
  Di82Service,
  MaterielDto,
  MaterielService,
  PdfDto,
  PdfService,
  PlancherDto,
  PlancherService,
  PosteDto,
  PosteService,
} from 'app/@core/api';
import { LocalStorageService } from 'app/@core/services/local-storage.service';

@Component({
  selector: 'ngx-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss'],
})
export class RapportComponent implements OnInit {
  public di82s: Di82Dto[] = [];
  public pdfs: PdfDto[] = [];
  public consignes: ConsigneDto[] = [];
  public materiels: MaterielDto[] = [];
  public planchers: PlancherDto[] = [];
  public chantiers: ChantierDto[] = [];
  public constats: ConstatDto[] = [];
  public adrs: AdrDto[] = [];
  public settingsConstat = {
    hideSubHeader: true,
    actions: {
      delete: false,
      add: false,
      edit: false,
    },
    columns: {
      date: {
        title: 'Date',
        type: 'string',
        editable: false,
        valuePrepareFunction: (data) => {
          const datePipe = new DatePipe('fr');
          return datePipe.transform(data, 'dd/MM/yyyy');
        },
      },
      zone: {
        title: 'Zone',
        type: 'list',
        editable: false,
        valuePrepareFunction: (data) => {
          return data.label;
        },
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      faitMarquant: {
        title: 'Fait marquant',
        type: 'boolean',
        valuePrepareFunction: (data) => {
          return data ? 'oui' : 'non';
        },
      },
    },
  };
  public settingsPdf = {
    hideSubHeader: true,
    actions: {
      delete: false,
      add: false,
      edit: false,
    },
    columns: {
      date: {
        title: 'Date',
        type: 'string',
        editable: false,
        valuePrepareFunction: (data) => {
          const datePipe = new DatePipe('fr');
          return datePipe.transform(data, 'dd/MM/yyyy');
        },
      },
      zone: {
        title: 'Zone',
        type: 'list',
        editable: false,
        valuePrepareFunction: (data) => {
          return data.label;
        },
      },
      rapporteur: {
        title: 'Rapporteur',
        type: 'string',
      },
      numero: {
        title: 'N° de fiche',
        type: 'string',
      },
      conforme: {
        title: 'Contrôle C/NC',
        type: 'string',
        valuePrepareFunction: (data) => {
          return data ? 'Oui' : 'Non';
        },
      },
      commentaire: {
        title: 'Comentaire bloquant si NC',
        type: 'string',
      },
      responsable: {
        title: 'Responsable',
        type: 'string',
      },
    },
  };
  public settingsPlancher = {
    hideSubHeader: true,
    actions: {
      delete: false,
      add: false,
      edit: false,
    },
    columns: {
      date: {
        title: 'Date',
        type: 'string',
        editable: false,
        valuePrepareFunction: (data) => {
          const datePipe = new DatePipe('fr');
          return datePipe.transform(data, 'dd/MM/yyyy');
        },
      },
      zone: {
        title: 'Zone',
        type: 'list',
        editable: false,
        valuePrepareFunction: (data) => {
          return data.label;
        },
      },
      rapporteur: {
        title: 'Rapporteur',
        type: 'string',
      },
      description: {
        title: 'Intitulé de la plancher',
        type: 'number',
      },
      numero: {
        title: 'N° de fiche',
        type: 'string',
      },
      conforme: {
        title: 'Contrôle C/NC',
        type: 'string',
        valuePrepareFunction: (data) => {
          return data ? 'Oui' : 'Non';
        },
      },
      commentaire: {
        title: 'Comentaire bloquant si NC',
        type: 'string',
      },
    },
  };
  public settingsChantier = {
    hideSubHeader: true,
    actions: {
      delete: false,
      add: false,
      edit: false,
    },
    columns: {
      date: {
        title: 'Date',
        type: 'string',
        editable: false,
        valuePrepareFunction: (data) => {
          const datePipe = new DatePipe('fr');
          return datePipe.transform(data, 'dd/MM/yyyy');
        },
      },
      zone: {
        title: 'Zone',
        type: 'list',
        editable: false,
        valuePrepareFunction: (data) => {
          return data.label;
        },
      },
      rapporteur: {
        title: 'Rapporteur',
        type: 'string',
      },
      conforme: {
        title: 'Contrôle C/NC',
        type: 'string',
        valuePrepareFunction: (data) => {
          return data ? 'Oui' : 'Non';
        },
      },
      local: {
        title: 'Local',
        type: 'string',
      },
      chantier: {
        title: 'Chantier',
        type: 'string',
      },
      contact: {
        title: 'Contact',
        type: 'string',
      },
      responsable: {
        title: 'Responsable',
        type: 'string',
      },
    },
  };
  public settingsConsigne = {
    hideSubHeader: true,
    actions: {
      delete: false,
      add: false,
      edit: false,
    },
    columns: {
      date: {
        title: 'Date',
        type: 'string',
        editable: false,
        valuePrepareFunction: (data) => {
          const datePipe = new DatePipe('fr');
          return datePipe.transform(data, 'dd/MM/yyyy');
        },
      },
      zone: {
        title: 'Zone',
        type: 'list',
        editable: false,
        valuePrepareFunction: (data) => {
          return data.label;
        },
      },
      rapporteur: {
        title: 'Rapporteur',
        type: 'string',
      },
      description: {
        title: 'Intitulé de la consigne',
        type: 'number',
      },
      responsable: {
        title: 'Responsable',
        type: 'string',
      },
    },
  };
  public settingsDi82 = {
    hideSubHeader: true,
    actions: {
      delete: false,
      add: false,
      edit: false,
    },
    columns: {
      date: {
        title: 'Date',
        type: 'string',
        editable: false,
        valuePrepareFunction: (data) => {
          const datePipe = new DatePipe('fr');
          return datePipe.transform(data, 'dd/MM/yyyy');
        },
      },
      zone: {
        title: 'Zone',
        type: 'list',
        editable: false,
        valuePrepareFunction: (data) => {
          return data.label;
        },
      },
      rapporteur: {
        title: 'Rapporteur',
        type: 'string',
      },
      description: {
        title: 'Intitulé de la di82',
        type: 'number',
      },
      responsable: {
        title: 'Responsable',
        type: 'string',
      },
      ouverture: {
        title: 'Ouv/fer',
        type: 'string',
        valuePrepareFunction: (data) => {
          return data ? 'Ouverture' : 'Fermeture';
        },
      },
      numero: {
        title: 'N° de fiche',
        type: 'string',
      },
      conforme: {
        title: 'Contrôle C/NC',
        type: 'string',
        valuePrepareFunction: (data) => {
          return data ? 'Oui' : 'Non';
        },
      },
      commentaire: {
        title: 'Comentaire bloquant si NC',
        type: 'string',
      },
    },
  };
  public settingsMateriel = {
    hideSubHeader: true,
    actions: {
      delete: false,
      add: false,
      edit: false,
    },
    columns: {
      type: {
        title: 'Type',
        type: 'string',
        editable: false,
      },
      code: {
        title: 'Code',
        type: 'string',
        editable: false,
      },
      numero: {
        title: 'N°',
        type: 'string',
      },
      point: {
        title: 'Point',
        type: 'string',
      },
      diagnostic: {
        title: 'Diagnostic',
        type: 'string',
      },
      actions: {
        title: 'Actions',
        type: 'string',
      },
    },
  };
  public settingsAdr = {
    hideSubHeader: true,
    actions: {
      delete: false,
      add: false,
      edit: false,
    },
    columns: {
      date: {
        title: 'Date',
        type: 'string',
        editable: false,
        valuePrepareFunction: (data) => {
          const datePipe = new DatePipe('fr');
          return datePipe.transform(data, 'dd/MM/yyyy');
        },
      },
      zone: {
        title: 'Zone',
        type: 'list',
        editable: false,
        valuePrepareFunction: (data) => {
          return data.label;
        },
      },
      rapporteur: {
        title: 'Rapporteur',
        type: 'string',
      },
      adr: {
        title: 'Intitulé de la ADR',
        type: 'number',
      },
      local: {
        title: 'Local',
        type: 'string',
      },
      conforme: {
        title: 'Contrôle C/NC',
        type: 'string',
        valuePrepareFunction: (data) => {
          return data ? 'Oui' : 'Non';
        },
      },
      commentaire: {
        title: 'Comentaire bloquant si NC',
        type: 'string',
      },
      responsable: {
        title: 'Responsable',
        type: 'string',
      },
    },
  };
  constructor(
    private di82Service: Di82Service,
    private pdfService: PdfService,
    private consigneService: ConsigneService,
    private materielService: MaterielService,
    private chantierService: ChantierService,
    private plancherService: PlancherService,
    private adrService: AdrService,
    private posteService: PosteService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    const poste: PosteDto = this.localStorageService.getItem('poste');
    this.posteService.getPoste(poste.id.toString()).subscribe((res) => {
      this.constats = res.data.constats;
    });
    this.di82Service.getDi82s(poste.id.toString()).subscribe((res) => {
      this.di82s = res.data;
    });
    this.pdfService.getPdfs(poste.id.toString()).subscribe((res) => {
      this.pdfs = res.data;
    });
    this.consigneService.getConsignes(poste.id.toString()).subscribe((res) => {
      this.consignes = res.data;
    });
    this.materielService.getMateriels(poste.id.toString()).subscribe((res) => {
      this.materiels = res.data;
    });
    this.chantierService.getChantiers(poste.id.toString()).subscribe((res) => {
      this.chantiers = res.data;
    });
    this.plancherService.getPlanchers(poste.id.toString()).subscribe((res) => {
      this.planchers = res.data;
    });
    this.adrService.getAdrs(poste.id.toString()).subscribe((res) => {
      this.adrs = res.data;
    });
  }
}
