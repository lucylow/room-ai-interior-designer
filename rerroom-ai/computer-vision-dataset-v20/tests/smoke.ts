import {SceneGenerator} from '../src/generators/sceneGenerator';
import {isValidRecord} from '../src/dataset/schema';
import {buildDataset} from '../src/dataset/builder';
const g=new SceneGenerator(20261008); const r=g.generate(1,'train');
if(!isValidRecord(r))throw new Error('record invalid');
const d=buildDataset(120,20261008);
if(d.records.length!==120)throw new Error('unexpected dataset size');
if(!d.manifest.modalities.includes('depth'))throw new Error('depth modality missing');
console.log(JSON.stringify({ok:true,records:d.records.length,splits:d.manifest.splits,classes:d.manifest.classes.length}));
