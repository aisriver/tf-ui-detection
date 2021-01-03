/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-12-20 23:20:44
 * @LastEditors: 廖军
 * @LastEditTime: 2020-12-20 23:43:20
 */

import { execPromise } from './process';

const pipeline_config_path = './dataset_tools/ssdlite_mobilenet_v2_coco/model.config';
const model_dir = './models/v1_model';

execPromise(`
rm -fr models/v1_model && python3 model_main.py --pipeline_config_path=${pipeline_config_path} --model_dir=${model_dir} --num_train_steps=5000 --sample_1_of_n_eval_examples=1 --alsologtostder
`);
