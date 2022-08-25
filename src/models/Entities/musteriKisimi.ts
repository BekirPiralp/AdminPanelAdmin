import { EntityBase } from '../Base/entityBase';
import { Firma } from './firmaKismi';

export class Musteri extends EntityBase {
  public firma!: Firma;
  public tc!: string;
  public ad!: string;
  public soyad!: string;
}
