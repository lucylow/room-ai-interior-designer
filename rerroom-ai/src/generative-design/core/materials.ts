import type {MaterialRecipe,DesignStyleId} from './types';
const base=[
{id:'oak-linen',label:'Oak + Linen',surfaces:{floor:'natural oak',upholstery:'washed linen',cabinet:'light oak'},textureWords:['grain','woven','matte'],priceTier:'mid',maintenance:'medium',sustainability:.82},
{id:'walnut-brass',label:'Walnut + Aged Brass',surfaces:{cabinet:'walnut',metal:'aged brass',upholstery:'wool'},textureWords:['rich grain','brushed metal','soft weave'],priceTier:'high',maintenance:'medium',sustainability:.7},
{id:'stone-steel',label:'Stone + Steel',surfaces:{counter:'limestone',metal:'black steel',wall:'mineral plaster'},textureWords:['stone pores','powder coat','mineral texture'],priceTier:'high',maintenance:'low',sustainability:.68},
{id:'travertine-boucle',label:'Travertine + Boucle',surfaces:{counter:'travertine',upholstery:'boucle',wall:'warm plaster'},textureWords:['soft loop','porous stone','chalky plaster'],priceTier:'premium',maintenance:'high',sustainability:.74},
{id:'rattan-wood',label:'Rattan + Wood',surfaces:{cabinet:'rattan',floor:'oak',upholstery:'cotton'},textureWords:['woven cane','natural grain','soft weave'],priceTier:'mid',maintenance:'medium',sustainability:.86},
] as MaterialRecipe[];
export const materialsForStyle=(style:DesignStyleId)=>{const wanted=style==='industrial'?['stone-steel']:style==='bohemian'?['rattan-wood']:style==='organic-modern'?['travertine-boucle']:style==='mid-century'?['walnut-brass']:['oak-linen','walnut-brass'];return base.filter(x=>wanted.includes(x.id)||x.id==='oak-linen').slice(0,2);};
export const MATERIAL_LIBRARY=base;
