import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-materiel-en-cours',
  templateUrl: './materiel-en-cours.component.html',
  styleUrls: ['./materiel-en-cours.component.scss'],
})
export class MaterielEnCoursComponent implements OnInit {
  settings = {
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
      edit: true,
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

  source: LocalDataSource = new LocalDataSource();
  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((res) => {
      this.source = res.materiel.data;
    });
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
