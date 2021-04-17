import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { ViewCell } from "ng2-smart-table";

@Component({
  template: `
    <nb-button-group>
      <button class="ok" [pressed]="value === 'ok'" nbButtonToggle (click)="updateStatus('ok')">OK</button>
      <button class="repare" [pressed]="value === 'repare'" nbButtonToggle (click)="updateStatus('reparé')">Réparé</button>
      <button class="hs" [pressed]="value === 'hs'" nbButtonToggle (click)="updateStatus('hs')">HS</button>
    </nb-button-group>
  `,
  styles: [
    `
      button.ok.appearance-filled.size-medium.shape-rectangle.nb-transition.status-primary {
        background-color: #529E30 !important;
        border-color: #529E30 !important;
        color: #fff !important;
      }
      button.repare.appearance-filled.size-medium.shape-rectangle.nb-transition.status-primary {
        background-color: #FA5716 !important;
        border-color: #FA5716 !important;
        color: #fff !important;
      }
      button.hs.appearance-filled.size-medium.shape-rectangle.nb-transition.status-primary {
        background-color: #ff2d2d !important;
        border-color: #ff2d2d !important;
        color: #fff !important;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusMaterielComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() confirm = new EventEmitter<boolean>();

  constructor() {}

  public ngOnInit() {}

  public updateStatus(event): void {
    this.rowData = {...this.rowData, status: event};
    this.confirm.emit(this.rowData);
  }
}
