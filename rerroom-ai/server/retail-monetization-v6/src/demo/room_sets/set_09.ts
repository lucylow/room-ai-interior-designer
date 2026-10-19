export interface RoomSetLine{slot:string;productKey:string;quantity:number;priority:number}
export interface RoomSetFixture{id:string;room:string;style:string;budget:number;lines:RoomSetLine[]}
export const fixture_09:RoomSetFixture={id:'roomset_09',room:'bedroom',style:'industrial',budget:1955,lines:[
  {slot:'slot_0',productKey:'industrial_bedroom_0',quantity:1,priority:5},
  {slot:'slot_1',productKey:'industrial_bedroom_1',quantity:2,priority:4},
  {slot:'slot_2',productKey:'industrial_bedroom_2',quantity:1,priority:3},
  {slot:'slot_3',productKey:'industrial_bedroom_3',quantity:2,priority:2},
  {slot:'slot_4',productKey:'industrial_bedroom_4',quantity:1,priority:1},
  {slot:'slot_5',productKey:'industrial_bedroom_5',quantity:2,priority:0},
  {slot:'slot_6',productKey:'industrial_bedroom_6',quantity:1,priority:-1},
  {slot:'slot_7',productKey:'industrial_bedroom_7',quantity:2,priority:-2},
]};
export function requiredSlots_09(){return fixture_09.lines.filter(x=>x.priority>=3).map(x=>x.slot)}
export function budgetHeadroom_09(spent:number){return Math.max(0,fixture_09.budget-spent)}
