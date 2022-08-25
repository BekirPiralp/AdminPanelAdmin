import { EntityBase } from '../Base/entityBase';
import { Iletisim } from './iletisimKismi';
import { Personel } from './personelKismi';

export class Firma extends EntityBase {
  public adi!: string;
  public logoURL!: string;
  public iletisim?: Iletisim;
}

export class FirmaSahip extends EntityBase {
  public firma!: Firma;
  public personel!: Personel;
}

export class Bayi extends EntityBase {
  public firma!: Firma;
  public isim!: string;
  public iletisim?: Iletisim;
}

export class BayiYonetici extends EntityBase {
  public firma!: Firma;
  public bayi!: Bayi;
  public personel?: Personel;
}
