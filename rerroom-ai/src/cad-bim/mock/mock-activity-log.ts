export const mockActivityLog = Array.from({length:60},(_,i)=>({
 id:`activity-${i+1}`,
 day:(i%12)+1,
 actor:['AI','Avery','Morgan','Jordan'][i%4],
 kind:['layout','revision','comment','3d','task','approval','file'][i%7],
 message:[
  'Generated layout alternative', 'Moved concept furniture', 'Saved camera bookmark', 'Updated project task',
  'Added client review note', 'Compared two layouts', 'Imported source revision', 'Updated finish palette',
 ][i%8],
 linkedId:['plan-a','plan-b','camera-hero','task-2','comment-01','rev-005','model-demo','finish-palette'][i%8],
}));
