import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ChantierDto, ChantierService } from "app/@core/api";

@Component({
  selector: "ngx-read-ouv-ferm-chantier",
  templateUrl: "./read-ouv-ferm-chantier.component.html",
  styleUrls: ["./read-ouv-ferm-chantier.component.scss"],
})
export class ChantierReadComponent implements OnInit {
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
      conforme: {
        title: "Contrôle C/NC",
        type: "string",
        valuePrepareFunction: (data) => {
          return data ? "Oui" : "Non";
        },
      },
      local: {
        title: "Local",
        type: "string",
      },
      chantier: {
        title: "Chantier",
        type: "string",
      },
      contact: {
        title: "Contact",
        type: "string",
      },
      responsable: {
        title: "Responsable",
        type: "string",
      },
    },
  };
  public source = [];
  public zones = [];
  public data = [];

  constructor(
    private chantierService: ChantierService,
    public route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data.subscribe((res) => {
      this.data = this.source = res.chantiers.data;
      this.setZones();
    });
  }

  /**
   * solder
   */
  public solder(chantier: ChantierDto) {
    chantier = { ...chantier, status: ChantierDto.StatusEnum.Finished };
    this.chantierService
      .updateChantier(chantier)
      .subscribe(() => this.source.find((item) => item.id === chantier.id));
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
        this.source = this.data.filter(item => item.zone.label === param.label);
      }
    }
}
