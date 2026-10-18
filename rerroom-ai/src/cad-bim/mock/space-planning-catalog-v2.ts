import { FurnitureSpec } from '../planning/types';

export const mockCatalogV2:FurnitureSpec[]=[
 {id:'v2-sofa-01',name:'Modular Sofa 2800',category:'sofa',dimensions:{width:2.8,depth:.95,height:.82},clearance:{front:.8,back:.12,left:.25,right:.25},tags:['modular','hosting','linen'],roomTypes:['living-room']},
 {id:'v2-sofa-02',name:'Compact Sofa 2100',category:'sofa',dimensions:{width:2.1,depth:.9,height:.8},clearance:{front:.78,back:.12,left:.22,right:.22},tags:['compact','apartment'],roomTypes:['living-room','studio']},
 {id:'v2-chair-01',name:'Lounge Chair',category:'chair',dimensions:{width:.78,depth:.82,height:.88},clearance:{front:.65,back:.12,left:.16,right:.16},tags:['lounge','reading'],roomTypes:['living-room','bedroom','office']},
 {id:'v2-chair-02',name:'Dining Armchair',category:'chair',dimensions:{width:.58,depth:.64,height:.84},clearance:{front:.62,back:.1,left:.12,right:.12},tags:['dining'],roomTypes:['dining-room','kitchen']},
 {id:'v2-table-01',name:'Round Coffee Table 1000',category:'coffee-table',dimensions:{width:1,depth:1,height:.38},clearance:{front:.48,back:.48,left:.48,right:.48},tags:['round','oak'],roomTypes:['living-room']},
 {id:'v2-console-01',name:'Low Media Console',category:'media',dimensions:{width:1.65,depth:.44,height:.5},clearance:{front:1.65,back:.1,left:.12,right:.12},tags:['media','storage'],roomTypes:['living-room']},
 {id:'v2-shelf-01',name:'Open Bookcase 900',category:'storage',dimensions:{width:.9,depth:.34,height:1.9},clearance:{front:.8,back:.04,left:.05,right:.05},tags:['books','display'],roomTypes:['living-room','office']},
 {id:'v2-desk-01',name:'Writing Desk 1400',category:'desk',dimensions:{width:1.4,depth:.7,height:.74},clearance:{front:1,back:.1,left:.15,right:.15},tags:['work','quiet'],roomTypes:['office','bedroom','studio']},
 {id:'v2-bed-01',name:'Queen Upholstered Bed',category:'bed',dimensions:{width:1.65,depth:2.15,height:.65},clearance:{front:.75,back:.05,left:.72,right:.72},tags:['bed','upholstered'],roomTypes:['bedroom']},
 {id:'v2-dining-01',name:'Extendable Dining Table',category:'dining-table',dimensions:{width:1.9,depth:.95,height:.76},clearance:{front:.9,back:.9,left:.85,right:.85},tags:['hosting','extendable'],roomTypes:['dining-room','kitchen']},
 {id:'v2-island-01',name:'Island 2100',category:'island',dimensions:{width:2.1,depth:.9,height:.91},clearance:{front:1.05,back:1.05,left:.78,right:.78},tags:['prep','social'],roomTypes:['kitchen']},
 {id:'v2-rug-01',name:'Wool Rug 2400x1700',category:'rug',dimensions:{width:2.4,depth:1.7,height:.015},clearance:{front:0,back:0,left:0,right:0},tags:['wool','warm'],roomTypes:['living-room','bedroom']},
 {id:'v2-lamp-01',name:'Tripod Floor Lamp',category:'lighting',dimensions:{width:.45,depth:.45,height:1.65},clearance:{front:.3,back:.15,left:.15,right:.15},tags:['ambient','soft'],roomTypes:['living-room','bedroom','office']},
];
