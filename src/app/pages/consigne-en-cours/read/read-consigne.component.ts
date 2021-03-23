import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConsigneService, CreateConsigneDto } from "app/@core/api";
import { ConsigneDto } from "app/@core/api/model/consigneDto";
import { LocalStorageService } from "app/@core/services/local-storage.service";
import { ToggleFieldComponent } from "../../../@theme/components";

@Component({
  selector: "ngx-read-consigne",
  templateUrl: "./read-consigne.component.html",
  styleUrls: ["./read-consigne.component.scss"],
})
export class ConsigneReadComponent implements OnInit {
  public settings = {
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
      edit: false,
    },
    columns: {
      date: {
        title: "Date",
        type: "string",
        editable: false,
        valuePrepareFunction: (data) => {
          const datePipe = new DatePipe("fr");
          return datePipe.transform(data, "dd/MM/yyyy");
        },
      },
      zone: {
        title: "Zone",
        type: "list",
        editable: false,
        valuePrepareFunction: (data) => {
          return data.label;
        },
      },
      rapporteur: {
        title: "Rapporteur",
        type: "string",
      },
      description: {
        title: "Intitulé de la consigne",
        type: "number",
      },
      responsable: {
        title: "Responsable",
        type: "string",
      },
      action: {
        title: "Action",
        type: "custom",
        renderComponent: ToggleFieldComponent,
        onComponentInitFunction: (instance: any) => {
          instance.confirm.subscribe((row) => this.solder(row));
        },
      },
    },
  };
  public source = [];
  public zones = [];
  public data = [];

  constructor(
    private consigneService: ConsigneService,
    private localStorageService: LocalStorageService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((res) => {
      this.data = this.source = res.consignes.data.filter(
        (consigne) => consigne.status === ConsigneDto.StatusEnum.InProgress
      );
      this.setZones();
    });
  }

  /**
   * solder
   */
  public solder(consigne: ConsigneDto) {
    const newConsigne: CreateConsigneDto = {
      ...consigne,
      zone: `${consigne.zone.id}`,
      projet: `${consigne.projet.id}`,
      status: ConsigneDto.StatusEnum.Finished,
      responsable: this.localStorageService.getItem("user").email,
    };
    this.consigneService
      .updateConsigne(`${consigne.id}`, newConsigne)
      .subscribe((res) => {
        const index = this.source.findIndex((item) => item.id === consigne.id);
        this.source[index] = res.data.data;
      });
  }

  /**
   * setZones
   */
  public setZones() {
    this.source.forEach((item) => {
      const index = this.zones.findIndex(
        (zone) => zone.label === item.zone.label
      );
      if (index > -1) {
        this.zones[index] = {
          ...this.zones[index],
          count: ++this.zones[index].count,
        };
      } else {
        this.zones.push({
          label: item.zone.label,
          count: 1,
        });
      }
    });
  }

  /**
   * filter
   */
  public filter(param) {
    if (param === null) {
      this.source = this.data;
    } else {
      this.source = this.data.filter((item) => item.zone.label === param.label);
    }
  }
}
