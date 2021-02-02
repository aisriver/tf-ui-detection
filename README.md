![tensorflow赋能前端](https://upload-images.jianshu.io/upload_images/19837079-5979487180789556.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 第一部分、引言

###### 一、阅读本篇文章你能得到什么

-   1、了解 tensorflow 及关键社区资源；
-   2、能够自主训练和应用自己想要的模型（主要）；
-   3、开阔前端智能化的思考与认知；

###### 二、什么是对象识别

简单来说，在图片或视频识别出你关注的对象类别、坐标就是对象识别，你可以通过以下视频加深认知：

-   1、Ai 采摘机器人：
    https://www.bilibili.com/video/BV1YE41147iV/?spm_id_from=333.788.videocard.2
-   2、英雄联盟血条识别：
    https://www.bilibili.com/s/video/BV1gs411V7B5
-   3、车辆识别：
    https://www.bilibili.com/video/BV1si4y1b7RP/?spm_id_from=333.788.videocard.6
-   4、人物识别：
    https://www.bilibili.com/video/BV1Es411K7CQ/?spm_id_from=333.788.videocard.11
-   5、卫星船舶检测
    https://www.bilibili.com/s/video/BV1QC4y187Yx

###### 三、前端为什么需要对象识别能力

![D2C](https://upload-images.jianshu.io/upload_images/19837079-b259ba20936926af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

-   1、通过对象识别可以做到 D2C，也就是设计稿识别产出代码；
-   2、他带给了前端更多可能性、效率提升、可控能力；

###### 四、带着目标看流程

![ui-识别.jpg](https://upload-images.jianshu.io/upload_images/19837079-5fc8f2d4013b3180.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
我简单训练了一个 antd ui 识别模型，可以将图片中的 ui 组件坐标和类别识别出来，同时附带识别的分数，下面将详细为大家介绍如何训练一个自己的 object_detection 模型。

### 第二部分、object_detection 完整实践

**分为以下几个环节：**

-   1、搭建环境；
-   2、创建数据集；
-   3、选择预训练算法模型；
-   4、调整参数开始训练；
-   5、验证训练成果；
-   6、导出并转换模型给前端使用（浏览器/node 环境）；

###### 一、搭建环境

参考：https://www.tensorflow.org/install

-   1、准备最新 python 环境；
-   2、安装 tensorflow2；
-   3、通过 pip 安装 tensorflowjs（这个主要用于转换最终导出的模型供 js 环境使用）；
-   4、注意 Python Package Installation 这一步：https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2.md
-   5、可通过 conda 做环境管理（可选）；

注意：直接使用 tensorflow2 就行了，没有太多必要使用 tensorflow1；安装和使用过程中应该会遇到一些 pip 包缺失的问题，这个需要自己看提示解决，其实跟 npm 类似。建议用主机进行环境搭建及训练，配置当然越高越好。

###### 二、创建数据集

tensorflow 对象识别需要使用 tfrecord 格式数据集
推荐的标注平台：https://app.labelbox.com/
推荐的制作导出平台：https://app.roboflow.com/
创建数据集的方式有很多种，可以通过 python 语言创建自定义 tfrecords 数据集，也可以通过各类数据集标注平台；

注：

-   1、tfrecords 是 tensorflow 定义的一种数据格式，直接用于数据训练；
-   2、通过收集大量训练图片进行人工标注（也有半自动标注、自动标注，如通过 UI 组件生产页面进行自动标注）；
-   3、标注的分类数量需要尽可能均匀一些，减少准确性偏差；

###### 这里简单介绍一下通过平台标注流程（labelbox+roboflow）：

##### labelbox 部分

-   1、准备一些含 ui 的图片，尺寸和名称没有特别要求，可以直接截图保存；
-   2、在 labelbox 新建项目并批量上传图片；
-   3、编辑分类
    ![编辑分类](https://upload-images.jianshu.io/upload_images/19837079-94cfe0ec05d18d9e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    ![添加ui分类](https://upload-images.jianshu.io/upload_images/19837079-b9149253a1c9a865.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
-   4、开始标注（start labeling）
    ![image.png](https://upload-images.jianshu.io/upload_images/19837079-a5860d92c6bbac51.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    ![image.png](https://upload-images.jianshu.io/upload_images/19837079-aa168190e6a778ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
-   5、完成所有标注，导出 JSON 文件
    ![image.png](https://upload-images.jianshu.io/upload_images/19837079-994a15873a378f08.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### roboflow 部分

-   1、创建数据集
    ![image.png](https://upload-images.jianshu.io/upload_images/19837079-15c42d1312f77911.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
-   2、按提示上传刚刚导出的 json 文件，根据提示继续操作
-   3、在导入数据集基础上，进行自定义图片处理
    ![image.png](https://upload-images.jianshu.io/upload_images/19837079-d5182d012e51b64c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    注意：这里可能包含旋转、模糊、翻转等操作，你可以通过最终模型识别目标来判断是否有必要加入某一步骤；比如：如果你识别的全部都是方方正正的 UI 设计稿，则旋转就没有太多必要了。他的作用在于帮你自动处理扩充数据集，以便适应各类识别场景。
-   4、点击 generate、查看健康检查
    ![image.png](https://upload-images.jianshu.io/upload_images/19837079-e7eab6c0a29ac66d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    注意：上文提到过，尽量不要让标注的分类数量相差太多。
-   5、下载数据集
    ![image.png](https://upload-images.jianshu.io/upload_images/19837079-d9d1b30e7e1df253.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    注意：这里选择 tensorflow tfrecord 格式下载即可。

###### 三、选择预训练算法模型

tensorflow 拥有很完善的文档，大家直接在对应的官网或 github 寻找即可！
https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md
![image.png](https://upload-images.jianshu.io/upload_images/19837079-72b6be1395e55fb4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
目前使用的是（训练容易/导出的文件不算太大）：SSD MobileNet V2 FPNLite 640x640
选择模型的时候需要考虑以下几点：

-   1、识别速度；
-   2、识别准确率；
-   3、训练难度（尺寸越大训练难度越大，主要体现在对机器性能上）；
-   4、前端解析识别数据（重要）；

注意：多数模型都提供了入参（处理后的图片）和出参（一个 tensor 格式的数组），不同模型最终产出的结果是不一样的，但一般都包含对象分数 score、对象尺寸及位置 boxes、数量等，这些需要自行判断。

###### 四、调整参数开始训练

![image.png](https://upload-images.jianshu.io/upload_images/19837079-e9c8e84130a2f4fa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_training_and_evaluation.md
![image.png](https://upload-images.jianshu.io/upload_images/19837079-369c899c1b57ed2f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

主要有以下几个参数需要调整：

-   1、num_classes 代表数据集的分类数量；
-   2、fine_tune_checkpoint 指向下载预训练模型中的 checkpoint（根据这个文件的 model_checkpoint_path 来就行）；
-   3、fine_tune_checkpoint_type 改成 detection（实际分类模型 tf2 也有提供，如不改容易出现内存问题中断训练）；
-   4、label_map_path 都指向导出 tfrecords 里面生成的就行（其实就是标注的分类）；
-   5、tf_record_input_reader 分别对应 train/test 目录的 tfrecord 文件；
-   6、关键点 train_config 配置，batch_size 训练批次（即一次训练所抓取的数据样本数量）、total_steps、num_steps 调整，这部分既要考虑机器性能又要考虑数据量，需要根据自己的实际情况而定（位数的调整可能引起成倍的训练时间）；

注意：

-   1、建议找个性能不错的主机进行训练，用自己的 mac 大概率会失败（下一步验证训练结果会提及）。
-   2、批次大小机器允许的情况可以设置大一些，但也不是越大越好哈，可以自己另外了解一下；
-   3、total step 根据 loss 曲线做调整；
-   4、二次训练场景（有了一个训练好的优质模型，里面已经储备了大量知识，当前训练的数据比较少，可以尝试在已有模型基础上二次训练），如果不确定建议都从 0 开始；
-   5、训练时长受数据、算法模型、批次、step、机器效率等影响，可以通过本地编译、使用 gpu 加速等方式减少训练时间；

###### 五、验证训练成果

执行：tensorboard --logdir model_dir
打开启动的地址：http://localhost:6006/

-   1、观察 loss 曲线，判断 step 设置是否合理
    ![image.png](https://upload-images.jianshu.io/upload_images/19837079-e411c663e2933f46.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
-   2、查看图片验证结果
    ![image.png](https://upload-images.jianshu.io/upload_images/19837079-dd53fc249c14938e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注意：通过以上 2 点基本可以确定模型是否可用，大家也可以学习一下其他分析技巧，互相分享。

###### 六、导出并转换模型给前端使用（浏览器/node 环境）

-   1、exporter_main_v2.py 导出 saved_model；
-   2、记得 pip install tensorflowjs，然后使用 tensorflowjs_converter 转换成前端可用模型
-   3、参考 coco-ssd 的模型导入与识别：https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd

注意：后面其实就是通过@tensorflow/tfjs-core 等库进行模型加载和图片识别了，也可以参考我这个库https://github.com/aisriver/tf-ui-detection，里面包括了一些训练代码和使用示例。
![image.png](https://upload-images.jianshu.io/upload_images/19837079-97ab6b3993defa95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 第三部分、结合 tensorflow 的其他前端实践

可直接投入前端使用的模型和演示：https://github.com/tensorflow/tfjs-models
其他能力：图像分类、文本识别、语音识别、视频识别，并可以直接在社区找到对应资源；

-   前端应用：
    组件识别/D2C（如 imgcook：https://www.imgcook.com/）、
    图表库识别（大屏设计稿识别）、搜图（antd 的图表搜索）、
    手势识别（大屏手势交互：https://www.bilibili.com/video/BV1ET4y1j7SL/?spm_id_from=333.788.videocard.2）、语言指令、恶意评论检测、敏感图片/视频识别、智能家居、物联领域的环境安全检测等

大屏通过手势进行互动，想想都觉得很酷，而且实现起来也没有那么难。

##### 推荐一个直接可用的文本 ocr 识别

ocr 识别比训练一个对象识别模型更加复杂，需要考虑语言、字体等因素，所以我没有选择自己训练，太麻烦。
推荐使用：https://www.npmjs.com/package/tesseract.js
支持多国家语言
![image.png](https://upload-images.jianshu.io/upload_images/19837079-d86de7e60f7f898e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**智能化让前端拥有更多可能性！**

### 最后，帮大家整合一下社区资源

-   1、官网：https://tensorflow.google.cn/
-   2、模型库可数据集（重要）：https://www.tensorflow.org/resources/models-datasets
-   3、对象识别 github（核心）：https://github.com/tensorflow/models/tree/master/research/object_detection
-   4、训练和评估（重要）：https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_training_and_evaluation.md
-   5、js 相关已有模型库及应用（参考）：https://github.com/tensorflow/tfjs-models
-   6、数据标注平台（重要）：https://app.labelbox.com/
-   7、数据集订制与导出平台（重要）：https://app.roboflow.com/
-   8、模型分析工具（了解就行）：https://github.com/lutzroeder/netron
-   9、tflite 在 node 环境下使用（我没有试过）：https://www.npmjs.com/package/node-tflite
-   10、文本 OCR 识别（推荐）：https://www.npmjs.com/package/tesseract.js

#### github

[https://github.com/aisriver](https://github.com/aisriver)
