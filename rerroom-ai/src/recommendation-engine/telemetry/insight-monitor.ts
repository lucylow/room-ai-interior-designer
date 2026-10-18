import type {AIEvent} from './event-types';
export const insightMonitor=(events:AIEvent[])=>{const viewed=events.filter(e=>e.name==='insight_viewed').length;const acted=events.filter(e=>e.name==='insight_acted').length;return {viewed,acted,actionRate:viewed?acted/viewed:0};};
