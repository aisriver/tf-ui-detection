/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-12-20 22:57:30
 * @LastEditors: 廖军
 * @LastEditTime: 2021-01-28 16:48:02
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

import image15 from './images/image15.jpg';
import image2 from './images/image2.jpg';
import image10 from './images/image10.jpg';
import image16 from './images/image16.jpg';
import image11 from './images/image11.jpg';
import image17 from './images/image11.jpg';
import image20 from './images/image20.jpg';

let modelPromise;
const images = [image15, image2, image10, image16, image11, image17, image20];

window.onload = () =>
	(modelPromise = cocoSsd.load({
		// modelUrl: 'https://storage.googleapis.com/tfjs-models/savedmodel/ssdlite_mobilenet_v2/model.json',
		// modelUrl: 'http://192.168.1.107:8066/web_model/model.json',
	}));

const c = document.getElementById('canvas');
const context = c.getContext('2d');

const select = document.getElementById('images');
select.innerHTML = images.map((_, ind) => `<option value="${ind}">测试${ind + 1}</option>`).join('');
select.onchange = async event => {
	context.clearRect(0, 0, c.width, c.height);
	image.src = images[event.srcElement.options[event.srcElement.selectedIndex].value];
};

// 	const model = await modelPromise;
// 	model.dispose();
// 	modelPromise = cocoSsd.load({
// 		base: event.srcElement.options[event.srcElement.selectedIndex].value,
// 		// modelUrl: 'https://storage.googleapis.com/tfjs-models/savedmodel/ssdlite_mobilenet_v2/model.json',
// 	});

const image = document.getElementById('image');
image.src = images[0];

const runButton = document.getElementById('run');
runButton.onclick = async () => {
	context.clearRect(0, 0, c.width, c.height);
	const model = await modelPromise;
	console.log('model loaded');
	console.time('predict1');
	const result = await model.detect(image, {
		scores: { index: 1 },
		boxes: { index: 0 },
		minScore: 0.1,
	});
	console.timeEnd('predict1');

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
