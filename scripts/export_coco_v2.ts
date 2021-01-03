/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-12-20 02:16:01
 * @LastEditors: 廖军
 * @LastEditTime: 2021-01-03 17:21:39
 */
import { execPromise } from './process';

const pipeline_config_path = './dataset_tools/ssd_mobilenet_v2_640/model.config'; // ssd_mobilenet_v2_640 resnet101_v1
const trained_checkpoint_dir = './models/ui_detection_model';
const output_directory = './output';
// const trained_checkpoint_prefix = './models/ui_detection_model/ckpt-1';

execPromise(`
rm -fr output && python3 exporter_main_v2.py --input_type image_tensor --pipeline_config_path ${pipeline_config_path} --trained_checkpoint_dir ${trained_checkpoint_dir} --output_directory ${output_directory}
`);

// execPromise(`
// rm -fr output && python3 export_tflite_graph_tf2.py --pipeline_config_path ${pipeline_config_path} --trained_checkpoint_dir ${trained_checkpoint_dir} --output_directory ${output_directory}
// `);
