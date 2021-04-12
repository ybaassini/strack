import { Component, Input } from "@angular/core";

@Component({
  selector: "ngx-status-card",
  styleUrls: ["./status-card.component.scss"],
  template: `
    <nb-card class="d-flex justify-content-between">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{title}}</div>
      </div>

      <div class="actions pr-2" routerLink="{{link}}">
        <button nbButton status="primary" >
          Voir
        </button>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {
  @Input() title: string;
  @Input() type: string;
  @Input() link: string = '/dashboard';
  @Input() on = true;
}
