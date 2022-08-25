import { EntityBase } from '../Base/entityBase';

export class Mesaj extends EntityBase {
  public ad!: string;
  public soyad!: string;
  public eposta!: string;
  public konu!: string;
  public icerik!: string;
}
