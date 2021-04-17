import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MaterielService, PosteDto, PosteService } from "app/@core/api";
import { LocalStorageService } from "app/@core/services/local-storage.service";
import { StatusMaterielComponent } from "app/@theme/components/table/status-materiel-field.component";
import { sub } from "date-fns";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: "ngx-materiel",
  templateUrl: "./materiel.component.html",
  styleUrls: ["./materiel.component.scss"],
})
export class MaterielComponent implements OnInit {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
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
      delete: true,
      add: true,
      edit: true,
    },
    columns: {
      type: {
        title: "Type",
        type: "string",
      },
      code: {
        title: "Code",
        type: "string",
      },
      numero: {
        title: "N°",
        type: "string",
      },
      point: {
        title: "Point",
        type: "string",
      },
      status: {
        title: "Etat",
        type: "custom",
        renderComponent: StatusMaterielComponent,
        onComponentInitFunction: (instance: any) => {
          instance.confirm.subscribe((row) => this.update(row));
        },
      },
      diagnostic: {
        title: "Diagnostic",
        type: "string",
      },
      actions: {
        title: "Actions",
        type: "string",
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  historyMateriels: LocalDataSource = new LocalDataSource();
  constructor(
    public localStorageService: LocalStorageService,
    public activatedRoute: ActivatedRoute,
    public posteService: PosteService,
    public materielService: MaterielService,
  ) {}

  public ngOnInit() {
    this.activatedRoute.data.subscribe((res) => {
      this.source = res.currentMateriels.data;
    });
  }

  public getHistory() {
    const poste: PosteDto = this.localStorageService.getItem("poste");
    switch (poste.label) {
      case "morning":
        const date = sub(new Date(), { days: 1 });
        this.posteService
          .getPostes(date, "afternoon")
          .subscribe((poste) => (this.historyMateriels = poste.materiels));
        break;
      case "afternoon":
        this.posteService
          .getPostes(new Date(), "morning")
          .subscribe((poste) => (this.historyMateriels = poste.materiels));
        break;
      case "day":
        this.posteService
          .getPostes(new Date(), "night")
          .subscribe((poste) => (this.historyMateriels = poste.materiels));
      case "night":
        const date = sub(new Date(), { days: 1 });
        this.posteService
          .getPostes(date, "day")
          .subscribe((poste) => (this.historyMateriels = poste.materiels));
        break;
      default:
        break;
    }
  }

  public onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  /**
   * update
   */
  public update(row) {
    this.materielService.updateMateriel(row).subscribe();
  }
}
