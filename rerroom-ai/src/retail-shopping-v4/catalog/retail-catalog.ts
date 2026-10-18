import { RetailProduct, RetailQuery, RetailResult } from '../domain/commerce-types';
export class RetailCatalog{
  constructor(private readonly rows:RetailProduct[]){ }
  all(){return this.rows.slice();}
  get(id:string){return this.rows.find(p=>p.id===id);}
  search(q:RetailQuery):RetailResult{
    let rows=this.rows.slice();
    const needle=(q.query||'').trim().toLowerCase();
    if(needle) rows=rows.filter(p=>(p.name+' '+p.tags.join(' ')+' '+p.materials.join(' ')).toLowerCase().includes(needle));
    if(q.roomType) rows=rows.filter(p=>p.roomTypes.includes(q.roomType!));
    if(q.styles?.length) rows=rows.filter(p=>q.styles!.some(s=>p.styles.includes(s)));
    if(q.categories?.length) rows=rows.filter(p=>q.categories!.includes(p.category));
    if(q.maxPrice!=null) rows=rows.filter(p=>p.price.amount<=q.maxPrice!);
    if(q.constraints) rows=rows.filter(p=>this.matches(p,q.constraints!));
    rows.sort((a,b)=>a.price.amount-b.price.amount);
    return {products:rows.slice(0,q.limit??30),source:'snapshot',retrievedAt:new Date().toISOString(),warning:'Demo catalog snapshot. Verify live retailer data before purchase.'};
  }
  private matches(p:RetailProduct,c:{maxWidth?:number;maxDepth?:number;maxHeight?:number;minWidth?:number;minDepth?:number}){
    const d=p.dimensions;
    if(c.maxWidth!=null&&d.width>c.maxWidth)return false;
    if(c.maxDepth!=null&&d.depth>c.maxDepth)return false;
    if(c.maxHeight!=null&&d.height>c.maxHeight)return false;
    if(c.minWidth!=null&&d.width<c.minWidth)return false;
    if(c.minDepth!=null&&d.depth<c.minDepth)return false;
    return true;
  }
}
