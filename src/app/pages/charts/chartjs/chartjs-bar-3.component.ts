import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbThemeService, NbColorHelper } from "@nebular/theme";
import { ConstatManagementService } from "app/@core/services/constat-management.service";

@Component({
  selector: "ngx-chartjs-bar3",
  template: ` <chart type="bar" [data]="data" [options]="options"></chart> `,
})
export class ChartjsBar3Component implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  dataGroup;

  constructor(
    private theme: NbThemeService,
    private route: ActivatedRoute,
    private constatManagementService: ConstatManagementService
  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.route.data.subscribe((data) => {
        this.dataGroup = this.constatManagementService.groupByRisqueAndZone(
          data.postes.data
        );
      });
      const allColors = [
        colors.infoLight,
        colors.dangerLight,
        colors.primaryLight,
        colors.successLight,
        colors.info,
        colors.danger,
        colors.primary,
        colors.success,
      ];
      const dede = this.dataGroup.risques.map((risque, index) => {
        return {
          data: risque.count,
          label: risque.label,
          backgroundColor: NbColorHelper.hexToRgbA(allColors[index], 0.8),
        };
      });
      this.data = {
        labels: this.dataGroup.zones.map((zone) => zone),
        datasets: dede,
      };
      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
                beginAtZero: true,
              },
            },
          ],
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
