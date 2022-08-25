import { EntityBase } from '../Base/entityBase';

export class IpucuVeYazi extends EntityBase {
  public baslik!: string;
  public icerik!: string;
  public logoURL?: string;
  public tarih!: Date;
}
