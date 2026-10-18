export interface WorkItem<T> {
  id: string;
  priority: number;
  run: () => Promise<T>;
}

export class VisualizationScheduler {
  private queue: WorkItem<unknown>[] = [];
  private running = false;

  enqueue<T>(item: WorkItem<T>): void {
    this.queue.push(item as WorkItem<unknown>);
    this.queue.sort((a,b)=>b.priority-a.priority);
    void this.drain();
  }

  clear(): void { this.queue=[]; }

  pending(): number { return this.queue.length; }

  private async drain(): Promise<void> {
    if(this.running) return;
    this.running=true;
    try{
      while(this.queue.length){
        const item=this.queue.shift()!;
        try{ await item.run(); }catch{ /* one bad asset must not stop the queue */ }
      }
    }finally{
      this.running=false;
    }
  }
}

export function chunk<T>(items:T[],size=8):T[][] {
  const chunks:T[][]=[];
  const safe=Math.max(1,Math.floor(size));
  for(let i=0;i<items.length;i+=safe) chunks.push(items.slice(i,i+safe));
  return chunks;
}
