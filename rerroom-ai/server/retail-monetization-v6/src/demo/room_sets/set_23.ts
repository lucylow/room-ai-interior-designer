export interface RoomSetLine{slot:string;productKey:string;quantity:number;priority:number}
export interface RoomSetFixture{id:string;room:string;style:string;budget:number;lines:RoomSetLine[]}
export const fixture_23:RoomSetFixture={id:'roomset_23',room:'media-room',style:'warm-minimal',budget:3985,lines:[
  {slot:'slot_0',productKey:'warm-minimal_media-room_0',quantity:1,priority:5},
  {slot:'slot_1',productKey:'warm-minimal_media-room_1',quantity:2,priority:4},
  {slot:'slot_2',productKey:'warm-minimal_media-room_2',quantity:1,priority:3},
  {slot:'slot_3',productKey:'warm-minimal_media-room_3',quantity:2,priority:2},
  {slot:'slot_4',productKey:'warm-minimal_media-room_4',quantity:1,priority:1},
  {slot:'slot_5',productKey:'warm-minimal_media-room_5',quantity:2,priority:0},
  {slot:'slot_6',productKey:'warm-minimal_media-room_6',quantity:1,priority:-1},
  {slot:'slot_7',productKey:'warm-minimal_media-room_7',quantity:2,priority:-2},
]};
export function requiredSlots_23(){return fixture_23.lines.filter(x=>x.priority>=3).map(x=>x.slot)}
export function budgetHeadroom_23(spent:number){return Math.max(0,fixture_23.budget-spent)}
