import {SceneGenerator} from '../src/generators/sceneGenerator';
import {validateRecordValidator} from '../src/validators/recordValidator';
const r=new SceneGenerator(7).generate(7,'train');
const issues=validateRecordValidator(r);
if(issues.some(x=>x.severity==='error'))throw new Error('validator errors: '+JSON.stringify(issues));
console.log('validator pass',issues.length);
