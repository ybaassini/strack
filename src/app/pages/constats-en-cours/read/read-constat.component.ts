import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PosteService } from "app/@core/api";
import { ConstatDto } from "app/@core/api/model/constatDto";
import { LocalStorageService } from "app/@core/services/local-storage.service";
import { ToggleFieldComponent } from "../../../@theme/components";

@Component({
  selector: "ngx-read-constat",
  templateUrl: "./read-constat.component.html",
  styleUrls: ["./read-constat.component.scss"],
})
export class ConstatEnCoursReadComponent implements OnInit {
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
      type: {
        title: "Type",
        type: "string",
        editable: false,
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
  public postes = [];
  public zones = [];
  public data = [];

  constructor(
    private posteService: PosteService,
    private localStorageService: LocalStorageService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((res) => {
      this.postes = res.postes.data;
      this.data = this.source = res.postes.data.map(poste => poste.constats.filter(constat => !constat.finished));
      this.setZones();
    });
  }

  /**
   * solder
   */
  public solder(constat: ConstatDto) {
    const poste = this.postes.find(poste => poste.constats.find(constat => constat.id))[0];
    const newConstat = {
      ...constat,
      finished: true,
    };
    this.posteService.updateConstat({posteId: poste.id, constat: newConstat} as any).subscribe((res) => {
      
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
