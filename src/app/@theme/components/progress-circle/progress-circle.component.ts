import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss'],
})

export class ProgressCircleComponent implements OnChanges, OnInit {
  @Input() public percent = 10;
  @Input() public size = 120;
  @Input() public strokeWidth = 12;

  public position: number;
  public radius: number;
  public viewBox: string;
  public dashArray: number;
  public dashOffset: number;

  constructor() { }

  public ngOnChanges(changes: SimpleChanges) {
    if (!changes.percent.isFirstChange()) {
      this.drawPercent();
    }
  }

  public ngOnInit() {
    this.position = this.size / 2;
    this.radius = this.position - this.strokeWidth / 2;
    this.viewBox = `0 0 ${this.size} ${this.size}`;
    this.dashArray = Math.round(2 * Math.PI * this.radius);
    this.drawPercent(true);
  }

  public drawPercent(isFirstPaint = false) {
    if (isFirstPaint) {
      this.dashOffset = this.dashArray;
    }
    setTimeout(() => {
      this.dashOffset = Math.round(this.dashArray * (1 - this.percent / 100));
    }, 500);
  }
}
