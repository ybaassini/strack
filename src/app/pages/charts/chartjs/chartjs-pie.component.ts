import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbThemeService } from "@nebular/theme";
import { ConstatManagementService } from "app/@core/services/constat-management.service";

@Component({
  selector: "ngx-chartjs-pie",
  template: ` <chart type="pie" [data]="data" [options]="options"></chart> `,
})
export class ChartjsPieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  constats;

  constructor(
    private route: ActivatedRoute,
    private theme: NbThemeService,
    private constatManagementService: ConstatManagementService,
  ) {
    this.route.data.subscribe((data) => {
      this.constats = this.constatManagementService.groupByRank(data.postes.data);
    });
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ["Positif", "Negatif"],
        datasets: [
          {
            data: [this.constats.positif.length, this.constats.negatif.length],
            backgroundColor: [colors.primaryLight, colors.successLight],
          },
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
