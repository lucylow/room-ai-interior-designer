export class RNG {
  constructor(private seed=12345){}
  next(){this.seed=(1664525*this.seed+1013904223)>>>0;return this.seed/4294967296;}
  int(min:number,max:number){return Math.floor(this.next()*(max-min+1))+min;}
  float(min:number,max:number){return min+(max-min)*this.next();}
  pick<T>(items:T[]){return items[this.int(0,items.length-1)];}
  bool(p=.5){return this.next()<p;}
}
