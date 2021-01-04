import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    id: 1,
    balise: 'IODE',
    emplacement: 'Niv 11',
    numero: '3',
    max: '9',
    releve1: '28',
  }, {
    id: 2,
    balise: 'ABPM 203 M',
    emplacement: 'Niv 11',
    numero: '2',
    max: '1',
    releve1: '',
  }, {
    id: 3,
    balise: 'ABPM 203 M',
    emplacement: 'Niv 9',
    numero: '12',
    max: '1',
    releve1: '104',
  }, {
    id: 4,
    balise: 'ABPM 203 M',
    emplacement: 'Niv 8',
    numero: '4',
    max: '445',
    releve1: '340',
  }, {
    id: 5,
    balise: 'ABPM 203 M',
    emplacement: 'Niv 7',
    numero: '7',
    max: '1',
    releve1: '5',
  }, {
    id: 6,
    balise: 'ABPM 203 M',
    emplacement: 'Niv 5',
    numero: '42',
    max: '132',
    releve1: '',
  }];

  getData() {
    return this.data;
  }
}
