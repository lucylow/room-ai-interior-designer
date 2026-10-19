export interface RoomSetLine{slot:string;productKey:string;quantity:number;priority:number}
export interface RoomSetFixture{id:string;room:string;style:string;budget:number;lines:RoomSetLine[]}
export const fixture_04:RoomSetFixture={id:'roomset_04',room:'entryway',style:'modern',budget:1230,lines:[
  {slot:'slot_0',productKey:'modern_entryway_0',quantity:1,priority:5},
  {slot:'slot_1',productKey:'modern_entryway_1',quantity:2,priority:4},
  {slot:'slot_2',productKey:'modern_entryway_2',quantity:1,priority:3},
  {slot:'slot_3',productKey:'modern_entryway_3',quantity:2,priority:2},
  {slot:'slot_4',productKey:'modern_entryway_4',quantity:1,priority:1},
  {slot:'slot_5',productKey:'modern_entryway_5',quantity:2,priority:0},
  {slot:'slot_6',productKey:'modern_entryway_6',quantity:1,priority:-1},
  {slot:'slot_7',productKey:'modern_entryway_7',quantity:2,priority:-2},
]};
export function requiredSlots_04(){return fixture_04.lines.filter(x=>x.priority>=3).map(x=>x.slot)}
export function budgetHeadroom_04(spent:number){return Math.max(0,fixture_04.budget-spent)}
