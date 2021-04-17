import { StatusEnum } from '../../common/enum';
import * as mongoose from 'mongoose';
import { ConstatSchema } from './constat.schema';
import { MaterielSchema } from 'materiel/schemas/materiel.schema';
import { ConsigneSchema } from 'consigne/schemas/consigne.schema';
import { PdfSchema } from 'pdf/schemas/pdf.schema';
import { ChantierSchema } from 'ouv-ferm-chantier/schemas/chantier.schema';
import { PlancherSchema } from 'ouv-ferm-plancher/schemas/plancher.schema';
import { KrtSchema } from 'krt/schemas/krt.schema';
import { Di82Schema } from 'di82/schemas/di82.schema';
import { BaliseSchema } from 'balise/schemas/balise.schema';

export const PosteSchema = new mongoose.Schema({
  id: String,
  email: String,
  status: {type: String, default: StatusEnum.inProgress},
  label: String,
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zones' },
  date: {type: Date, default: Date.now},
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projets' },
  constats: [ConstatSchema],
  materiels: [MaterielSchema],
  consignes: [ConsigneSchema],
  pdfs: [PdfSchema],
  chantiers: [ChantierSchema],
  planchers: [PlancherSchema],
  krts: [KrtSchema],
  di82s: [Di82Schema],
  balises: [BaliseSchema],
});