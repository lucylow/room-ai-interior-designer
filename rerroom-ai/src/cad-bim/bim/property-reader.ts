import { BIMEntity } from '../core/types';
export function readProperty(entity:BIMEntity,name:string):string|number|boolean|null|undefined{for(const ps of entity.propertySets){if(name in ps.properties)return ps.properties[name];}return undefined;}
export function collectProperties(entity:BIMEntity):Record<string,string|number|boolean|null>{const out:Record<string,string|number|boolean|null>={};for(const ps of entity.propertySets){for(const [k,v] of Object.entries(ps.properties))out[`${ps.name}.${k}`]=v;}return out;}
