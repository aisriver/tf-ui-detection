/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-12-20 01:34:00
 * @LastEditors: 廖军
 * @LastEditTime: 2021-01-02 16:42:58
 */
import { execPromise } from './process';

const pipeline_config_path = './dataset_tools/ssd_mobilenet_v2_640/model.config'; // ssd_mobilenet_v2_640 resnet101_v1
const model_dir = './models/ui_detection_model';

execPromise(`
rm -fr models/ui_detection_model && python3 model_main_tf2.py --pipeline_config_path=${pipeline_config_path} --model_dir=${model_dir} --alsologtostder
`);
