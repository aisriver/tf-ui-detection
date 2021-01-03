/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-12-21 19:39:47
 * @LastEditors: 廖军
 * @LastEditTime: 2020-12-21 20:07:07
 */
import { execPromise } from './process';

const pipeline_config_path = './dataset_tools/ssdlite_mobilenet_v2_coco/model.config';
const trained_checkpoint_prefix = './models/v1_model/model.ckpt-232';
const output_directory = './output_v1';

execPromise(`
rm -fr output_v1 && python3 export_inference_graph.py --input_type=image_tensor --pipeline_config_path=${pipeline_config_path} --trained_checkpoint_prefix=${trained_checkpoint_prefix} --output_directory=${output_directory}
`);
