import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PosteDto, PosteService } from "app/@core/api";
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
      description: {
        title: "Description",
        type: "string",
        editable: false,
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
  public postes: PosteDto[] = [];
  public zones = [];
  public data = [];
  public constatsInProgress: ConstatDto[] = [];

  constructor(
    private posteService: PosteService,
    private localStorageService: LocalStorageService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((res) => {
      this.postes = res.postes.data;
      this.initConstats(this.postes);
      this.source = this.constatsInProgress;
    });
  }

  public initConstats(postes) {
    postes.forEach(poste => {
      poste.constats.forEach(constat => {
        if (!constat.finished) {
          this.constatsInProgress.push(constat);
        }
      });
    });
  }

  /**
   * solder
   */
  public solder(selectedConstat: ConstatDto) {
    const poste = this.postes.find(poste => {
      return poste.constats.includes(selectedConstat);
    });
    const newConstat = {
      ...selectedConstat,
      finished: true,
    };
    this.posteService.updateConstat({posteId: poste.id, constat: newConstat} as any).subscribe((res) => {
      
    });
  }

}
