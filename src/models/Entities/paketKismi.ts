import { EntityBase } from "../Base/entityBase";

export class Paket extends EntityBase{
    public isim!:string
    public fiyat!:string
}

export class PaketOzellik extends EntityBase{
    public isim!:string
}

export class PaketAitOzellik extends EntityBase{
    public paket!:Paket
    public ozellik!:PaketOzellik
}