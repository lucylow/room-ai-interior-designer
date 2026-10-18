import type{RoomType}from './types';

export interface FilterMatrixRow{room:RoomType;styles:string[];palettes:string[];note:string;}

export const MOCK_FILTER_MATRIX:FilterMatrixRow[]=[
  {
    room:'living_room' as RoomType,
    styles:['modern','minimalist','scandinavian','industrial','japandi','mid_century','organic_modern','bohemian'],
    palettes:['neutral_01','nordic_02','earth_03','coastal_04','moody_01','sunlit_02','clay_03','forest_04'],
    note:'Start with a calm base and one stronger focal accent.',
  },
  {
    room:'bedroom' as RoomType,
    styles:['minimalist','scandinavian','industrial','japandi','mid_century','organic_modern','bohemian','contemporary'],
    palettes:['nordic_01','earth_02','coastal_03','moody_04','sunlit_01','clay_02','forest_03','blue_04'],
    note:'Repeat one material across three visible touchpoints.',
  },
  {
    room:'kitchen' as RoomType,
    styles:['scandinavian','industrial','japandi','mid_century','organic_modern','bohemian','contemporary','warm_minimal'],
    palettes:['earth_01','coastal_02','moody_03','sunlit_04','clay_01','forest_02','blue_03','rose_04'],
    note:'Use contrast selectively so the layout remains readable.',
  },
  {
    room:'dining_room' as RoomType,
    styles:['industrial','japandi','mid_century','organic_modern','bohemian','contemporary','warm_minimal','quiet_luxury'],
    palettes:['coastal_01','moody_02','sunlit_03','clay_04','forest_01','blue_02','rose_03','ink_04'],
    note:'Start with a calm base and one stronger focal accent.',
  },
  {
    room:'home_office' as RoomType,
    styles:['japandi','mid_century','organic_modern','bohemian','contemporary','warm_minimal','quiet_luxury','coastal_modern'],
    palettes:['moody_01','sunlit_02','clay_03','forest_04','blue_01','rose_02','ink_03','brass_04'],
    note:'Repeat one material across three visible touchpoints.',
  },
  {
    room:'entryway' as RoomType,
    styles:['mid_century','organic_modern','bohemian','contemporary','warm_minimal','quiet_luxury','coastal_modern','modern_farmhouse'],
    palettes:['sunlit_01','clay_02','forest_03','blue_04','rose_01','ink_02','brass_03','neutral_04'],
    note:'Use contrast selectively so the layout remains readable.',
  },
  {
    room:'bathroom' as RoomType,
    styles:['organic_modern','bohemian','contemporary','warm_minimal','quiet_luxury','coastal_modern','modern_farmhouse','classic_transitional'],
    palettes:['clay_01','forest_02','blue_03','rose_04','ink_01','brass_02','neutral_03','nordic_04'],
    note:'Start with a calm base and one stronger focal accent.',
  },
  {
    room:'nursery' as RoomType,
    styles:['bohemian','contemporary','warm_minimal','quiet_luxury','coastal_modern','modern_farmhouse','classic_transitional','art_deco'],
    palettes:['forest_01','blue_02','rose_03','ink_04','brass_01','neutral_02','nordic_03','earth_04'],
    note:'Repeat one material across three visible touchpoints.',
  },
  {
    room:'studio' as RoomType,
    styles:['contemporary','warm_minimal','quiet_luxury','coastal_modern','modern_farmhouse','classic_transitional','art_deco','new_nordic'],
    palettes:['blue_01','rose_02','ink_03','brass_04','neutral_01','nordic_02','earth_03','coastal_04'],
    note:'Use contrast selectively so the layout remains readable.',
  },
  {
    room:'media_room' as RoomType,
    styles:['warm_minimal','quiet_luxury','coastal_modern','modern_farmhouse','classic_transitional','art_deco','new_nordic','soft_industrial'],
    palettes:['rose_01','ink_02','brass_03','neutral_04','nordic_01','earth_02','coastal_03','moody_04'],
    note:'Start with a calm base and one stronger focal accent.',
  },
  {
    room:'guest_room' as RoomType,
    styles:['quiet_luxury','coastal_modern','modern_farmhouse','classic_transitional','art_deco','new_nordic','soft_industrial','desert_modern'],
    palettes:['ink_01','brass_02','neutral_03','nordic_04','earth_01','coastal_02','moody_03','sunlit_04'],
    note:'Repeat one material across three visible touchpoints.',
  },
  {
    room:'reading_nook' as RoomType,
    styles:['coastal_modern','modern_farmhouse','classic_transitional','art_deco','new_nordic','soft_industrial','desert_modern','moody_modern'],
    palettes:['brass_01','neutral_02','nordic_03','earth_04','coastal_01','moody_02','sunlit_03','clay_04'],
    note:'Use contrast selectively so the layout remains readable.',
  },
];
