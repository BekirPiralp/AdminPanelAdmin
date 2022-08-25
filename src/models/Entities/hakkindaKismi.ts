import { EntityBase } from '../Base/entityBase';

export class HakkindaIcerik extends EntityBase {
  public icerik!: string;
  public resimUrl!: string;
}

export class HakkindaReklam extends EntityBase {
  public baslik!: string;
  public icerik!: string;
  public logoURL?: string;
}
