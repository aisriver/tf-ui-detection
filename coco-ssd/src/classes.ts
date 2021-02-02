/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-12-17 22:59:35
 * @LastEditors: 廖军
 * @LastEditTime: 2021-01-26 13:52:09
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

export interface ObjectDetectionClass {
	name: string;
	id: number;
	displayName: string;
}

export const CLASSES: { [key: string]: ObjectDetectionClass } = {
	'1': { name: 'button', id: 1, displayName: 'button' },
	'2': { name: 'checkbox', id: 2, displayName: 'checkbox' },
	'3': { name: 'datepicker', id: 3, displayName: 'datepicker' },
	'4': { name: 'daterangepicker', id: 4, displayName: 'daterangepicker' },
	'5': { name: 'input', id: 5, displayName: 'input' },
	'6': { name: 'inputnumber', id: 6, displayName: 'inputnumber' },
	'7': { name: 'progress', id: 7, displayName: 'progress' },
	'8': { name: 'radio', id: 8, displayName: 'radio' },
	'9': { name: 'rate', id: 9, displayName: 'rate' },
	'10': { name: 'select', id: 10, displayName: 'select' },
	'11': { name: 'slider', id: 11, displayName: 'slider' },
	'12': { name: 'switch', id: 12, displayName: 'switch' },
	'13': { name: 'table', id: 13, displayName: 'table' },
	'14': { name: 'timepicker', id: 14, displayName: 'timepicker' },
	'15': { name: 'timerangepicker', id: 15, displayName: 'timerangepicker' },
	'16': { name: 'upload', id: 16, displayName: 'upload' },
};
