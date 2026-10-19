export interface RoomSetLine{slot:string;productKey:string;quantity:number;priority:number}
export interface RoomSetFixture{id:string;room:string;style:string;budget:number;lines:RoomSetLine[]}
export const fixture_13:RoomSetFixture={id:'roomset_13',room:'nursery',style:'industrial',budget:2535,lines:[
  {slot:'slot_0',productKey:'industrial_nursery_0',quantity:1,priority:5},
  {slot:'slot_1',productKey:'industrial_nursery_1',quantity:2,priority:4},
  {slot:'slot_2',productKey:'industrial_nursery_2',quantity:1,priority:3},
  {slot:'slot_3',productKey:'industrial_nursery_3',quantity:2,priority:2},
  {slot:'slot_4',productKey:'industrial_nursery_4',quantity:1,priority:1},
  {slot:'slot_5',productKey:'industrial_nursery_5',quantity:2,priority:0},
  {slot:'slot_6',productKey:'industrial_nursery_6',quantity:1,priority:-1},
  {slot:'slot_7',productKey:'industrial_nursery_7',quantity:2,priority:-2},
]};
export function requiredSlots_13(){return fixture_13.lines.filter(x=>x.priority>=3).map(x=>x.slot)}
export function budgetHeadroom_13(spent:number){return Math.max(0,fixture_13.budget-spent)}
