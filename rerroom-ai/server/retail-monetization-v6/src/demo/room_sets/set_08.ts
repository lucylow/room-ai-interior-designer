export interface RoomSetLine{slot:string;productKey:string;quantity:number;priority:number}
export interface RoomSetFixture{id:string;room:string;style:string;budget:number;lines:RoomSetLine[]}
export const fixture_08:RoomSetFixture={id:'roomset_08',room:'living-room',style:'modern',budget:1810,lines:[
  {slot:'slot_0',productKey:'modern_living-room_0',quantity:1,priority:5},
  {slot:'slot_1',productKey:'modern_living-room_1',quantity:2,priority:4},
  {slot:'slot_2',productKey:'modern_living-room_2',quantity:1,priority:3},
  {slot:'slot_3',productKey:'modern_living-room_3',quantity:2,priority:2},
  {slot:'slot_4',productKey:'modern_living-room_4',quantity:1,priority:1},
  {slot:'slot_5',productKey:'modern_living-room_5',quantity:2,priority:0},
  {slot:'slot_6',productKey:'modern_living-room_6',quantity:1,priority:-1},
  {slot:'slot_7',productKey:'modern_living-room_7',quantity:2,priority:-2},
]};
export function requiredSlots_08(){return fixture_08.lines.filter(x=>x.priority>=3).map(x=>x.slot)}
export function budgetHeadroom_08(spent:number){return Math.max(0,fixture_08.budget-spent)}
