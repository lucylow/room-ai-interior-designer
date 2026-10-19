export function stableSplit(id:string): "train"|"validation"|"test"|"challenge" {
  let hash=0; for(const char of id) hash=(hash*31+char.charCodeAt(0))>>>0; const n=hash%100; return n<76?"train":n<88?"validation":n<96?"test":"challenge";
}

