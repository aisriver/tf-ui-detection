# coding=utf-8
'''
文件描述: 制作二进制FTRecord文件
公司: thundersdata
作者: 廖军
Date: 2020-12-12 23:18:10
LastEditors: 廖军
LastEditTime: 2020-12-13 23:15:26
'''
import os 
import tensorflow as tf 
from PIL import Image
from object_detection.utils import dataset_util

# 获取当前地址
cwd = os.getcwd()
classes = {'input','select', 'button'}
writer = tf.io.TFRecordWriter(cwd + "/output/train_ui.tfrecords")

for index, name in enumerate(classes):
    # 在Linux中以"/"分割，在Windows下以"\"分割
    class_path = cwd +"/images/"+ name+"/"
    for img_index, img_name in enumerate(os.listdir(class_path)):
        # 构建出每组数据的地址
        img_path = class_path + img_name

        img = Image.open(img_path)
        img = img.resize((300, 300))
        # 将图片转化为二进制的格式
        img_raw = img.tobytes()

        # example对象对label和image数据进行封装
        example = tf.train.Example(
            features=tf.train.Features(
                feature={
                    "label": dataset_util.bytes_feature(name.encode()),
                    "index": dataset_util.int64_feature(index),
                    "img_name": dataset_util.bytes_feature(img_name.encode()),
                    "img_index": dataset_util.int64_feature(img_index),
                    'img_raw': dataset_util.bytes_feature(img_raw),
                }
            )
        )
        # 将序列转为字符串
        writer.write(example.SerializeToString())
writer.close()