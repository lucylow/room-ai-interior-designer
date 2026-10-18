import {StyleFilterEngine} from '../filters/style-filter-engine';
import {MOCK_ROOM,mockDesignStyles} from '../mock/data';
export const runStyleFilterTest=()=>{const rows=new StyleFilterEngine().match(MOCK_ROOM,mockDesignStyles,'calm scandinavian warm light wood');if(rows[0]?.styleId!=='scandinavian')throw new Error('Scandinavian should rank highly for matching cues');return rows.slice(0,4);};
