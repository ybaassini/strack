import { Injectable } from "@angular/core";
import { PosteDto } from "../api";
import { ConstatDto } from "../api/model/constatDto";
@Injectable({ providedIn: "root" })
export class ConstatManagementService {
  constructor() {}

  /**
   * groupByRank
   */
  public groupByRank(postes: PosteDto[]) {
    let constats = [];
    postes.forEach((poste) => (constats = [...constats, ...poste.constats].filter(constat => constat.typeRisk?.vitale)));
    return {
      positif: constats.filter((constat) => constat.rank === "positif"),
      negatif: constats.filter((constat) => constat.rank === "negatif"),
    };
  }

  /**
   * groupByRank
   */
  public groupByZoneAndStatus(postes: PosteDto[]) {
    let zones = [];
    postes.forEach((poste) => {
      poste.constats.forEach((item) => {
        const index = zones.findIndex(
          (zone) => zone.label === poste.zone.label
        );
        if (index > -1) {
          zones[index] = {
            ...zones[index],
            solde: item.finished ? ++zones[index].solde : zones[index].solde,
            inProgress: !item.finished
              ? ++zones[index].inProgress
              : zones[index].inProgress,
          };
        } else {
          zones.push({
            label: poste.zone.label,
            solde: item.finished ? 1 : 0,
            inProgress: !item.finished ? 1 : 0,
          });
        }
      });
    });
    return zones;
  }

  /**
   * groupByRisqueAndChantier
   */
  public groupByRisqueAndChantier(postes: PosteDto[]) {
    let constats: ConstatDto[] = [];
    postes.forEach(
      (poste) =>
        (constats = [...constats, ...poste.constats].filter(
          (constat: any) => constat.typeRisk && constat.chantierEnjeu
        ))
    );
    let risques = [];
    const chantiersEnjeu = [
      ...new Set(
        constats
          .map((constat: any) => constat.chantierEnjeu)
          .filter((chantier) => chantier)
      ),
    ];
    constats.forEach((constat: any) => {
      if (
        constat.typeRisk &&
        !risques.find((risque) => risque.label === constat.typeRisk.label)
      ) {
        risques.push({
          label: constat.typeRisk?.label,
        });
      }
    });
    risques = risques.map((risque) => {
      let count = [];
      chantiersEnjeu.forEach((chantierEnjeu) => {
        count.push(
          constats.filter(
            (constat: any) =>
              constat.chantierEnjeu === chantierEnjeu &&
              constat.typeRisk?.label === risque.label
          ).length
        );
      });
      return {
        label: risque.label,
        count,
      };
    });
    return {
      chantiersEnjeu,
      risques,
    };
  }

  /**
   * groupByRisqueAndZone
   */
  public groupByRisqueAndZone(postes: PosteDto[]) {
    let constats: ConstatDto[] = [];
    postes.forEach((poste) => (constats = [...constats, ...poste.constats]));
    let risques = [];
    const zones = [
      ...new Set(
        postes
        .filter(poste => poste.constats.find(constat => constat.typeRisk))
        .map((poste) => poste.zone.label),
      ),
    ];
    constats
    .forEach((constat: any) => {
      if (
        constat.typeRisk &&
        !risques.find((risque) => risque.label === constat.typeRisk.label)
      ) {
        risques.push({
          label: constat.typeRisk.label,
        });
      }
    });
    risques = risques.map((risque) => {
      let count = [];
      zones.forEach((zone) => {
        count.push(
          postes.filter(
            (poste) =>
              poste.zone.label === zone &&
              poste.constats.find(
                (constat: any) => constat.typeRisk?.label === risque.label
              )
          ).length
        );
      });
      return {
        label: risque.label,
        count,
      };
    });
    return {
      zones,
      risques,
    };
  }
}
