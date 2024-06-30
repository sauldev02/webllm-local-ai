// import { MLCEngineWorkerHandler, MLCEngine } from "https://esm.run/@mlc-ai/web-llm";

import { WebWorkerMLCEngineHandler, MLCEngine } from "https://esm.run/@mlc-ai/web-llm";


const engine = new MLCEngine();
const handler = new WebWorkerMLCEngineHandler(engine);//new MLCEngineWorkerHandler(engine);

onmessage = msg => {
	handler.onmessage(msg);
}


// onmessage = (e) =>{
// 	console.log('Worker: Message received from main thread')
// 	console.log(e);

// 	if(e.data.name === 'Hello Worker!'){
// 		postMessage({name:'Hello Back!'})
// 	}
// }