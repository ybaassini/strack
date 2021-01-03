import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    id: 1,
    balise: 'IODE',
    emplacement: 'Niv 11',
    numero: '@mdo',
    max: 'mdo@gmail.com',
    releve1: '28',
  }, {
    id: 2,
    balise: 'ABPM 203 M',
    emplacement: 'Niv 11',
    numero: '@fat',
    max: 'fat@yandex.ru',
    releve1: '45',
  }, {
    id: 3,
    balise: 'ABPM 203 M',
    emplacement: 'Niv 9',
    numero: '@twitter',
    max: 'twitter@outlook.com',
    releve1: '18',
  }, {
    id: 4,
    balise: 'ABPM 203 M',
    emplacement: 'Niv 8',
    numero: '@snow',
    max: 'snow@gmail.com',
    releve1: '20',
  }, {
    id: 5,
    balise: 'ABPM 203 M',
    emplacement: 'Niv 7',
    numero: '@jack',
    max: 'jack@yandex.ru',
    releve1: '30',
  }, {
    id: 6,
    balise: 'ABPM 203 M',
    emplacement: 'Niv 5',
    numero: '',
    max: '',
    releve1: '',
  }];

  getData() {
    return this.data;
  }
}
