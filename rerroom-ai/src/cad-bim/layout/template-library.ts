import { makeTemplate, LayoutTemplate } from './layout-template';
export const layoutTemplates:LayoutTemplate[]=[
 makeTemplate('living-conversation','Living / Conversation',['conversation','view','circulation'],['living-room']),
 makeTemplate('living-media','Living / Media Focus',['focal','view','storage'],['living-room']),
 makeTemplate('bedroom-rest','Bedroom / Rest',['bedside','circulation','storage'],['bedroom']),
 makeTemplate('bedroom-work','Bedroom / Work Nook',['work','rest','privacy'],['bedroom']),
 makeTemplate('kitchen-triangle','Kitchen / Work Triangle',['prep','storage','circulation'],['kitchen']),
 makeTemplate('kitchen-social','Kitchen / Social',['island','dining','view'],['kitchen']),
 makeTemplate('office-focus','Office / Focus',['desk','storage','view'],['office']),
 makeTemplate('dining-host','Dining / Hosting',['table','circulation','lighting'],['dining-room']),
 makeTemplate('nursery-calm','Nursery / Calm',['crib','storage','activity'],['nursery']),
 makeTemplate('studio-flex','Studio / Flexible',['flex','storage','activity'],['studio']),
];
