import { FormGroup } from "@angular/forms";

export function commentaireAjouterSiControleConnu() {
    return (formGroup: FormGroup) => {
      const commentaire = formGroup.controls['commentaire'];
      const conforme = formGroup.controls['conforme'];
  
      if (commentaire.errors && !commentaire.errors.mustBeDefined) {
        return;
      }
  
      if (conforme.value && !commentaire.value) {
        commentaire.setErrors({ mustBeDefined: true });
      } else {
        commentaire.setErrors(null);
      }
    };
  }