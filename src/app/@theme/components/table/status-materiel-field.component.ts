import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { ViewCell } from "ng2-smart-table";

@Component({
  template: `
    <div class="container">
      <div class="button-wrap">
        <input
          class="hidden radio-label"
          id="yes-button"
          type="radio"
          name="accept-offers"
          checked="checked"
        />
        <label class="button-label" for="yes-button">
          <h5>Ok</h5>
        </label>
        <input
          class="hidden radio-label"
          id="no-button"
          type="radio"
          name="accept-offers"
        />
        <label class="button-label" for="no-button">
          <h5>Réparé</h5>
        </label>
        <input
          class="hidden radio-label"
          id="maybe-button"
          type="radio"
          name="accept-offers"
        />
        <label class="button-label" for="maybe-button">
          <h5>HS</h5>
        </label>
      </div>
    </div>
  `,
  styles: [
    `
      @import url(https://fonts.googleapis.com/css?family=Lato:300,400,900);
      * {
        box-sizing: border-box;
      }

      html,
      body {
        height: 100%;
      }

      html {
        background: #444;
      }

      body {
        min-height: 100%;
        overflow: hidden;
      }

      .container {
        height: 100%;
        min-height: 100%;
        margin: 0 auto;
      }

      .button-wrap {
        position: relative;
        display: flex;
        text-align: center;
        top: 50%;
      }
      @media (max-width: 40em) {
        .button-wrap {
          margin-top: -1.5em;
        }
      }

      .button-label {
        display: inline-block;
        padding: 2px;
        margin: 3px;
        cursor: pointer;
        color: #292929;
        border-radius: 0.25em;
        background: #efefef;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
          inset 0 -3px 0 rgba(0, 0, 0, 0.22);
        transition: 0.3s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .button-label h5 {
        font-size: 1em;
        font-family: "Lato", sans-serif;
      }
      .button-label:hover {
        background: #d6d6d6;
        color: #101010;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
          inset 0 -3px 0 rgba(0, 0, 0, 0.32);
      }
      .button-label:active {
        transform: translateY(2px);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
          inset 0px -1px 0 rgba(0, 0, 0, 0.22);
      }
      @media (max-width: 40em) {
        .button-label {
          padding: 0em 1em 3px;
          margin: 0.25em;
        }
      }

      #yes-button {
        background-color: green;
      }

      #yes-button:checked + .button-label {
        background: #2ecc71;
        color: #efefef;
      }
      #yes-button:checked + .button-label:hover {
        background: #29b765;
        color: #e2e2e2;
      }

      #no-button {
        background-color: orange;
      }

      #no-button:checked + .button-label {
        background: #d91e18;
        color: #efefef;
      }
      #no-button:checked + .button-label:hover {
        background: #c21b15;
        color: #e2e2e2;
      }

      #maybe-button {
        background-color: red;
      }

      #maybe-button:checked + .button-label {
        background: #4183d7;
        color: #efefef;
      }
      #maybe-button:checked + .button-label:hover {
        background: #2c75d2;
        color: #e2e2e2;
      }

      .hidden {
        display: none;
      }
    `,
  ],
})
export class StatusMaterielComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() confirm = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  updateStatus(event): void {
    this.confirm.emit(this.rowData);
  }
}
