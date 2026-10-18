import {MOCK_CREATIVE_STYLES} from './style-library';
import {MOCK_PALETTES} from './palette-library';
import {MOCK_LAYOUT_ADVICE} from './layout-advice-library';
import {MOCK_CREATIVE_CONCEPTS} from './concept-library';
import {MOCK_REFINEMENTS} from './refinement-library';
import {MOCK_FURNITURE_AESTHETICS} from './furniture-aesthetic-library';
import {MOCK_USER_PREFERENCES} from './user-preferences-library';
import {MOCK_DESIGN_SCENARIOS} from './scenario-library';
import {MOCK_GENERATION_PROMPTS} from './prompt-library';
import {MOCK_MOODBOARD_CARDS} from './moodboard-library';
import {MOCK_GALLERY_PROJECTS} from './demo-gallery-library';
import {MOCK_FILTER_MATRIX} from './filter-matrix';
export interface MockDataQAReport{collections:Record<string,number>;duplicateIds:string[];invalidReferences:string[];status:'pass'|'fail';}
function d(ids:string[]):string[]{const s=new Set<string>(),o=new Set<string>();for(const id of ids){if(s.has(id))o.add(id);s.add(id);}return[...o];}
export function runGenerativeMockDataQA():MockDataQAReport{const duplicateIds=[...d(MOCK_CREATIVE_STYLES.map(x=>x.id)),...d(MOCK_PALETTES.map(x=>x.id)),...d(MOCK_LAYOUT_ADVICE.map(x=>x.id)),...d(MOCK_CREATIVE_CONCEPTS.map(x=>x.id)),...d(MOCK_REFINEMENTS.map(x=>x.id)),...d(MOCK_FURNITURE_AESTHETICS.map(x=>x.id)),...d(MOCK_USER_PREFERENCES.map(x=>x.id)),...d(MOCK_DESIGN_SCENARIOS.map(x=>x.id)),...d(MOCK_GENERATION_PROMPTS.map(x=>x.id)),...d(MOCK_MOODBOARD_CARDS.map(x=>x.id)),...d(MOCK_GALLERY_PROJECTS.map(x=>x.id))];const styleIds=new Set(MOCK_CREATIVE_STYLES.map(x=>x.id));const paletteIds=new Set(MOCK_PALETTES.map(x=>x.id));const invalidReferences:string[]=[];for(const p of MOCK_PALETTES)for(const s of p.styleFit)if(!styleIds.has(s))invalidReferences.push(`palette:${p.id}->style:${s}`);for(const c of MOCK_CREATIVE_CONCEPTS){if(!styleIds.has(c.style))invalidReferences.push(`concept:${c.id}->style:${c.style}`);if(!paletteIds.has(c.palette))invalidReferences.push(`concept:${c.id}->palette:${c.palette}`);}const collections={styles:MOCK_CREATIVE_STYLES.length,palettes:MOCK_PALETTES.length,layoutAdvice:MOCK_LAYOUT_ADVICE.length,concepts:MOCK_CREATIVE_CONCEPTS.length,refinements:MOCK_REFINEMENTS.length,furnitureAesthetics:MOCK_FURNITURE_AESTHETICS.length,userProfiles:MOCK_USER_PREFERENCES.length,scenarios:MOCK_DESIGN_SCENARIOS.length,prompts:MOCK_GENERATION_PROMPTS.length,moodboards:MOCK_MOODBOARD_CARDS.length,gallery:MOCK_GALLERY_PROJECTS.length,filters:MOCK_FILTER_MATRIX.length};return{collections,duplicateIds,invalidReferences,status:duplicateIds.length||invalidReferences.length?'fail':'pass'};}
