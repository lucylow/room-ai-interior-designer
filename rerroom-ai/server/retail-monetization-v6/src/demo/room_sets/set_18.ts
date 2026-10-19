export interface RoomSetLine{slot:string;productKey:string;quantity:number;priority:number}
export interface RoomSetFixture{id:string;room:string;style:string;budget:number;lines:RoomSetLine[]}
export const fixture_18:RoomSetFixture={id:'roomset_18',room:'home-office',style:'organic-modern',budget:3260,lines:[
  {slot:'slot_0',productKey:'organic-modern_home-office_0',quantity:1,priority:5},
  {slot:'slot_1',productKey:'organic-modern_home-office_1',quantity:2,priority:4},
  {slot:'slot_2',productKey:'organic-modern_home-office_2',quantity:1,priority:3},
  {slot:'slot_3',productKey:'organic-modern_home-office_3',quantity:2,priority:2},
  {slot:'slot_4',productKey:'organic-modern_home-office_4',quantity:1,priority:1},
  {slot:'slot_5',productKey:'organic-modern_home-office_5',quantity:2,priority:0},
  {slot:'slot_6',productKey:'organic-modern_home-office_6',quantity:1,priority:-1},
  {slot:'slot_7',productKey:'organic-modern_home-office_7',quantity:2,priority:-2},
]};
export function requiredSlots_18(){return fixture_18.lines.filter(x=>x.priority>=3).map(x=>x.slot)}
export function budgetHeadroom_18(spent:number){return Math.max(0,fixture_18.budget-spent)}
