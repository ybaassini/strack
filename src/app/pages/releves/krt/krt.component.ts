import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-krt',
  templateUrl: './krt.component.html',
  styleUrls: ['./krt.component.scss'],
})
export class KRTComponent {


  previous = {
    globale: {
      hideSubHeader: true,
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        delete: false,
        add: false,
        edit: false
      },
      columns: {
        chaine: {
          title: 'Chaînes',
          type: 'string',
          editable: false
        },
        local: {
          title: 'Local',
          type: 'string',
          editable: false
        },
        armoire: {
          title: 'Armoire',
          type: 'number',
        },
        unit: {
          title: 'Unité',
          type: 'number',
          editable: false
        },
        s1: {
          title: 'S1',
          type: 'number',
          editable: false
        },
        s2: {
          title: 'S2',
          type: 'number',
          editable: false
        },
        knownorUnknown: {
          title: 'C/NC',
          type: 'number',
        },
        inr: {
          title: 'Affichage INR',
          type: 'number',
        },        
        inhibition: {
          title: 'Inhibition',
          type: 'number',
          editable: false
        },
      },
    },
    controle: {
      hideSubHeader: true,
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        delete: false,
        add: false,
        edit: false
      },
      columns: {
        chaine: {
          title: 'Chaînes',
          type: 'string',
          editable: false
        },
        local: {
          title: 'Local',
          type: 'string',
          editable: false
        },
        armoire: {
          title: 'Armoire',
          type: 'number',
        },
        unit: {
          title: 'Unité',
          type: 'number',
          editable: false
        },
        s1: {
          title: 'S1',
          type: 'number',
          editable: false
        },
        s2: {
          title: 'S2',
          type: 'number',
          editable: false
        },
        knownorUnknown: {
          title: 'C/NC',
          type: 'number',
        },
        inr: {
          title: 'Affichage INR',
          type: 'number',
        },        
        inhibition: {
          title: 'Inhibition',
          type: 'number',
          editable: false
        },
      },
    }
  }

  current = {
    globale: {
      hideSubHeader: true,
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        delete: false,
        add: false,
        edit: false
      },
      columns: {
        balise: {
          title: 'Balise',
          type: 'string',
          editable: false
        },
        emplacement: {
          title: 'Emplacement',
          type: 'string',
          editable: false
        },
        numero: {
          title: 'N°',
          type: 'number',
        },
        max: {
          title: 'Valeur max relevée (Bq/m3)',
          type: 'number',
        },
        releve1: {
          title: 'Relevé n°1 (Bq/m3)',
          type: 'number',
        },
        releve2: {
          title: 'Relevé n°2 (Bq/m3)',
          type: 'number',
        },
      },
    },
    controle: {
      hideSubHeader: true,
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        balise: {
          title: 'Balise',
          type: 'string',
        },
        emplacement: {
          title: 'Emplacement',
          type: 'string',
        },
        numero: {
          title: 'N°',
          type: 'number',
        },
        max: {
          title: 'Valeur max relevée (Bq/m3)',
          type: 'number',
        },
        releve1: {
          title: 'Relevé n°1 (Bq/m3)',
          type: 'number',
        },
        releve2: {
          title: 'Relevé n°2 (Bq/m3)',
          type: 'number',
        },
      },
    }
  }

  source: LocalDataSource = new LocalDataSource();

  constructor() {
    this.source.load([]);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}