export interface BenchmarkResult { name:string; passed:boolean; score:number; notes:string[]; }
export function runBenchmark(name:string, score:number, threshold=0.85): BenchmarkResult {
  const passed=score>=threshold; return { name, passed, score, notes: passed?["threshold met","deterministic fixture"]:["review fixture","below threshold"] };
}

