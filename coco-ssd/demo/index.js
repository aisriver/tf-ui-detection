/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-12-20 22:57:30
 * @LastEditors: 廖军
 * @LastEditTime: 2021-01-03 17:30:49
 */
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as cpu from '@tensorflow/tfjs-backend-cpu';
import * as webgl from '@tensorflow/tfjs-backend-webgl';

import imageURL from './image8.jpg';
import image2URL from './image9.jpg';

let modelPromise;
let baseModel = 'lite_mobilenet_v2';

window.onload = () =>
	(modelPromise = cocoSsd.load({
		// modelUrl: 'https://storage.googleapis.com/tfjs-models/savedmodel/ssdlite_mobilenet_v2/model.json',
	}));

const button = document.getElementById('toggle');
button.onclick = () => {
	image.src = image.src.endsWith(imageURL) ? image2URL : imageURL;
};

// const select = document.getElementById('base_model');
// select.onchange = async event => {
// 	const model = await modelPromise;
// 	model.dispose();
// 	modelPromise = cocoSsd.load({
// 		base: event.srcElement.options[event.srcElement.selectedIndex].value,
// 		// modelUrl: 'https://storage.googleapis.com/tfjs-models/savedmodel/ssdlite_mobilenet_v2/model.json',
// 	});
// };

const image = document.getElementById('image');
image.src = imageURL;

const runButton = document.getElementById('run');
runButton.onclick = async () => {
	const model = await modelPromise;
	console.log('model loaded');
	console.time('predict1');
	const result = await model.detect(image, {
		scores: { index: 1 },
		boxes: { index: 0 },
	});
	console.timeEnd('predict1');

	const c = document.getElementById('canvas');
	const context = c.getContext('2d');
	context.drawImage(image, 0, 0);
	context.font = '10px Arial';

	console.log('result', result);
	console.log('number of detections: ', result.length);
	for (let i = 0; i < result.length; i++) {
		context.beginPath();
		context.rect(...result[i].bbox);
		context.lineWidth = 1;
		context.strokeStyle = 'green';
		context.fillStyle = 'green';
		context.stroke();
		context.fillText(
			result[i].score.toFixed(3) + ' ' + result[i].class,
			result[i].bbox[0],
			result[i].bbox[1] > 10 ? result[i].bbox[1] - 5 : 10
		);
	}
};
