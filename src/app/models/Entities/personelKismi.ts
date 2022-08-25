import { EntityBase } from '../Base/entityBase';
import { SosyalMedyaLogo } from './logoKismi';

export class Personel extends EntityBase {
  public tc!: string;
  public ad!: string;
  public soyad!: string;
  public fotoUrl?: string;
}

export class PersonelGorev extends EntityBase {
  public personel!: Personel;
  public isim!: string;
  public tanim!: string;
}

export class PersonelSifre extends EntityBase {
  public personel!: Personel;
  public sifre!: string;
}

export class PersonelSosyalMedya extends EntityBase {
  public personel!: Personel;
  public sosyalMedyaUrl?: string;
  public sosyalMedyaLogo?: SosyalMedyaLogo;
}
