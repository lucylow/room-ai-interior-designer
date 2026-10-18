import {generateMockCreativeDesign} from './mock-generative-engine';
import {runGenerativeMockDataQA} from './mock-data-qa';
export function runMockGenerativeDemo(){
 const scandinavian=generateMockCreativeDesign({room:'living_room',style:'scandinavian',palette:'nordic_01',requestedChanges:['bright airy','cozy'],budget:1500,limit:4});
 const minimalist=generateMockCreativeDesign({room:'bedroom',style:'minimalist',requestedChanges:['less furniture','calm'],budget:1200,limit:4});
 const industrial=generateMockCreativeDesign({room:'home_office',style:'industrial',palette:'moody_02',requestedChanges:['more contrast','functional storage'],budget:1800,limit:4});
 return {qa:runGenerativeMockDataQA(),scandinavian,minimalist,industrial};
}
