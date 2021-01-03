/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-12-20 00:29:41
 * @LastEditors: 廖军
 * @LastEditTime: 2020-12-28 23:15:32
 */
import { execPromise } from './process';

const dataDirName = 'hardHatSample.v3.coco'; // hardHatSample.v3.coco tf-ui-detection.v1.coco

execPromise(`
  python3 create_coco_tf_record.py --logtostderr \
  --train_image_dir=./dataset_tools/${dataDirName}/train \
  --val_image_dir=./dataset_tools/${dataDirName}/valid \
  --test_image_dir=./dataset_tools/${dataDirName}/test \
  --train_annotations_file=./dataset_tools/${dataDirName}/train/_annotations.coco.json \
  --val_annotations_file=./dataset_tools/${dataDirName}/valid/_annotations.coco.json \
  --testdev_annotations_file=./dataset_tools/${dataDirName}/test/_annotations.coco.json \
  --output_dir=./dataset_tools/output
`);
