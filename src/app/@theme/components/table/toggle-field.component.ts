import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ConsigneDto } from 'app/@core/api/model/consigneDto';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <nb-toggle status="primary" [disabled]="solde" [checked]="solde" (checkedChange)="updateStatus($event)">Soldé</nb-toggle>
  `,
})
export class ToggleFieldComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() confirm = new EventEmitter<boolean>();
  public solde = false;

  constructor() {}

  ngOnInit() {
    this.solde = this.rowData.status === ConsigneDto.StatusEnum.Finished;
  }

  updateStatus(event): void {
    if (this.rowData.status === ConsigneDto.StatusEnum.Finished) {
      return;
    }
    if (window.confirm('Etes-vous sur de vouloir solder ?')) {
      this.confirm.emit(this.rowData);
      this.solde = true;
    }
  }
}