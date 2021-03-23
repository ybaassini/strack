import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PdfDto, PdfService } from "app/@core/api";

@Component({
  selector: "ngx-read-pdf",
  templateUrl: "./read-pdf.component.html",
  styleUrls: ["./read-pdf.component.scss"],
})
export class PdfReadComponent implements OnInit {
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
      numero: {
        title: "N° de fiche",
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
  public data = [];
  public source = [];
  public zones = [];

  constructor(private pdfService: PdfService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((res) => {
      this.data = this.source = res.pdfs.data;
      this.setZones();
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
      this.source = this.data.filter(item => item.zone.label === param.label);
    }
  }
}
