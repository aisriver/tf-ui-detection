/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-12-20 02:22:56
 * @LastEditors: 廖军
 * @LastEditTime: 2020-12-21 20:05:04
 */
import { execPromise } from './process';

const input_format = 'tf_saved_model';
const output_node_names = '"output_v1"';
const saved_model_tags = 'serve';
const saved_model_dir = './output_v1/saved_model';
const web_model_dir = './output_v1/web_model';

execPromise(`
tensorflowjs_converter --input_format=${input_format} --output_node_names=${output_node_names} --saved_model_tags=${saved_model_tags} ${saved_model_dir} ${web_model_dir}
`);
