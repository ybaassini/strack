import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent {
  @ViewChild('constat', { static: true }) accordion;

  toggle() {
    this.accordion.toggle();
  }
}
