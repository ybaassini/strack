import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ZonesResolver } from "app/@core/resolver";
import { PdfsResolver } from "app/@core/resolver/pdf/pdfs.resolver";

import { PdfComponent } from "./pdf.component";
import { PdfCreateComponent } from "./create/create-pdf.component";
import { PdfReadComponent } from "./read/read-pdf.component";

const routes: Routes = [
  {
    path: "",
    component: PdfComponent,
    children: [
      {
        path: "",
        redirectTo: "read"
      },
      {
        path: "create",
        component: PdfCreateComponent,
        resolve: {
          zones: ZonesResolver,
        },
      },
      {
        path: "read",
        component: PdfReadComponent,
        resolve: {
          pdfs: PdfsResolver,
        },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfRoutingModule {}

export const routedComponents = [
  PdfComponent,
  PdfCreateComponent,
  PdfReadComponent,
];
