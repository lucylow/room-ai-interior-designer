import { runAllV9Tests } from './src/apple-storekit-v9/testing/run-all-v9';
runAllV9Tests().then(result=>console.log(JSON.stringify(result,null,2)));
