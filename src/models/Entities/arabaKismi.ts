import {EntityBase} from "../Base/entityBase";

export class Araba extends EntityBase{
    public tip!:ArabaTip;
    public marka!:ArabaMarka;
    public kasaTip!:ArabaKasaTip;
    public model:string="";
    public resimUrl?:string;
    public uretimYili?:number;
    public vitesTip!:ArabaVitesTip;
    public gunlukFiyat?:number;
}

export class ArabaAitOzellik extends EntityBase{
    public araba!:Araba;
    public arabaAitOzellik!:ArabaAitOzellik;
}

export class ArabaKasaTip extends EntityBase{
    public isim!:string;
}

export class ArabaMarka extends EntityBase{
    public isim!:string;
}

export class ArabaOzellik extends EntityBase{
    public isim!:string;
}

export class ArabaTip extends EntityBase{
    public isim!:string;
}

export class ArabaVitesTip extends EntityBase{
    public isim!:string;
}
