import { EntityBase } from '../Base/entityBase';

export class Hizmet extends EntityBase {
  public isim!: string;
  public tanim!: string;
  public logoUrl?: string;
  public resimUrl?: string;
}

export class HizmetAlt extends EntityBase {
  public hizmet!: Hizmet;
  public isim!: string;
}

export class HizmetAltOzellik extends EntityBase {
  public hizmetalt!: HizmetAlt;
  public isim!: string;
}
