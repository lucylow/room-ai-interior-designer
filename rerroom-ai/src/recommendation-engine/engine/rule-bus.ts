import type {RoomContext,UserPreferences,Recommendation,Insight} from '../core/types';
import {generateRecommendations as layout,generateInsight as layoutInsight} from '../rules/layout';
import {generateRecommendations as light,generateInsight as lightInsight} from '../rules/lighting';
import {generateRecommendations as storage,generateInsight as storageInsight} from '../rules/storage';
import {generateRecommendations as comfort,generateInsight as comfortInsight} from '../rules/comfort';
import {generateRecommendations as style,generateInsight as styleInsight} from '../rules/style';
export const collectRules=(room:RoomContext,prefs:UserPreferences):{recommendations:Recommendation[];insights:Insight[]}=>{
 const recommendations=[...layout(room,prefs),...light(room,prefs),...storage(room,prefs),...comfort(room,prefs),...style(room,prefs)];
 const insights=[layoutInsight(room),lightInsight(room),storageInsight(room),comfortInsight(room),styleInsight(room)];return {recommendations,insights};
};
