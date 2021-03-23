import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdrDto, AdrService } from "app/@core/api";

@Component({
  selector: "ngx-read-adr",
  templateUrl: "./read-adr.component.html",
  styleUrls: ["./read-adr.component.scss"],
})
export class AdrReadComponent implements OnInit {
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
      adr: {
        title: "Intitulé de la ADR",
        type: "number",
      },
      local: {
        title: "Local",
        type: "string",
      },
      conforme: {
        title: "Contrôle C/NC",
        type: "string",
        valuePrepareFunction: (data) => {
          return data ? "Oui" : "Non";
        },
      },
      commentaire: {
        title: "Comentaire bloquant si NC",
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

  constructor(private adrService: AdrService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((res) => {
      this.data = this.source = res.adrs.data;
      this.setZones();
    });
  }

  /**
   * solder
   */
  public solder(adr: AdrDto) {
    adr = { ...adr, status: AdrDto.StatusEnum.Finished };
    this.adrService
      .updateAdr(adr)
      .subscribe(() => this.source.find((item) => item.id === adr.id));
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
