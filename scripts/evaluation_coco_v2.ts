/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-01-02 22:46:34
 * @LastEditors: 廖军
 * @LastEditTime: 2021-01-02 22:49:24
 */

import { execPromise } from './process';

const pipeline_config_path = './dataset_tools/ssd_mobilenet_v2_640/model.config'; // ssd_mobilenet_v2_640 resnet101_v1
const model_dir = './models/ui_detection_model';
const checkpoint_dir = model_dir;

execPromise(`
python3 model_main_tf2.py --pipeline_config_path=${pipeline_config_path} --model_dir=${model_dir} --checkpoint_dir=${checkpoint_dir} --alsologtostder
`);
