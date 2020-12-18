# Object Detection (coco-ssd)

Object detection model that aims to localize and identify multiple objects in a single image.

This model is a TensorFlow.js port of the COCO-SSD model. For more information about Tensorflow object detection API, check out this readme in
[tensorflow/object_detection](https://github.com/tensorflow/models/blob/master/research/object_detection/README.md).

This model detects objects defined in the COCO dataset, which is a large-scale object detection, segmentation, and captioning dataset. You can find more information [here](http://cocodataset.org/#home). The model is capable of detecting [80 classes of objects](https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/classes.ts). (SSD stands for Single Shot MultiBox Detection).

This TensorFlow.js model does not require you to know about machine learning.
It can take input as any browser-based image elements (`<img>`, `<video>`, `<canvas>`
elements, for example) and returns an array of bounding boxes with class name and confidence level.

## Usage

There are two main ways to get this model in your JavaScript project: via script tags or by installing it from NPM and using a build tool like Parcel, WebPack, or Rollup.

### via Script Tag

```html
<!-- Load TensorFlow.js. This is required to use coco-ssd model. -->
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"> </script>
<!-- Load the coco-ssd model. -->
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"> </script>

<!-- Replace this with your image. Make sure CORS settings allow reading the image! -->
<img id="img" src="cat.jpg"/>

<!-- Place your code in the script tag below. You can also use an external .js file -->
<script>
  // Notice there is no 'import' statement. 'cocoSsd' and 'tf' is
  // available on the index-page because of the script tag above.

  const img = document.getElementById('img');

  // Load the model.
  cocoSsd.load().then(model => {
    // detect objects in the image.
    model.detect(img).then(predictions => {
      console.log('Predictions: ', predictions);
    });
  });
</script>
```

### via NPM
__Note__: The following shows how to use coco-ssd npm to transpile for web
deployment, not an example on how to use coco-ssd in the node env.

```js
// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');

(async () => {
  const img = document.getElementById('img');

  // Load the model.
  const model = await cocoSsd.load();

  // Classify the image.
  const predictions = await model.detect(img);

  console.log('Predictions: ');
  console.log(predictions);
})();
```

You can also take a look at the [demo app](https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/demo).

## API

#### Loading the model
`coco-ssd` is the module name, which is automatically included when you use the `<script src>` method. When using ES6 imports, `coco-ssd` is the module.

```ts
export interface ModelConfig {
  base?: ObjectDetectionBaseModel;
  modelUrl?: string;
}

cocoSsd.load(config: ModelConfig = {});
```

Args:
**config** Type of ModelConfig interface with following attributes:
 - **base:** Controls the base cnn model, can be 'mobilenet_v1', 'mobilenet_v2' or 'lite_mobilenet_v2'. Defaults to 'lite_mobilenet_v2'.
 lite_mobilenet_v2 is smallest in size, and fastest in inference speed.
 mobilenet_v2 has the highest classification accuracy.

 - **modelUrl:** An optional string that specifies custom url of the model. This is useful for area/countries that don't have access to the model hosted on GCP.

Returns a `model` object.

#### Detecting the objects

You can detect objects with the model without needing to create a Tensor.
`model.detect` takes an input image element and returns an array of bounding boxes with class name and confidence level.

This method exists on the model that is loaded from `cocoSsd.load`.

```ts
model.detect(
  img: tf.Tensor3D | ImageData | HTMLImageElement |
      HTMLCanvasElement | HTMLVideoElement, maxNumBoxes: number, minScore: number
)
```

Args:

- **img:** A Tensor or an image element to make a detection on.
- **maxNumBoxes:** The maximum number of bounding boxes of detected objects. There can be multiple objects of the same class, but at different locations. Defaults to 20.
- **minScore:** The minimum score of the returned bounding boxes of detected objects. Value between 0 and 1. Defaults to 0.5.

Returns an array of classes and probabilities that looks like:

```js
[{
  bbox: [x, y, width, height],
  class: "person",
  score: 0.8380282521247864
}, {
  bbox: [x, y, width, height],
  class: "kite",
  score: 0.74644153267145157
}]
```

### Technical details for advanced users

This model is based on the TensorFlow object detection API. You can download the original models from [here](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md#coco-trained-models). We applied the following optimizations to improve the performance for browser execution:

  1. Removed the post process graph from the original model.
  2. Used single class NonMaxSuppression instead of original multiple classes NonMaxSuppression for faster speed with similar accuracy.
  3. Executes NonMaxSuppression operations on CPU backend instead of WebGL to avoid delays on the texture downloads.

Here is the converter command for removing the post process graph.

```sh
tensorflowjs_converter --input_format=tf_frozen_model \
                       --output_format=tfjs_graph_model \
                       --output_node_names='Postprocessor/ExpandDims_1,Postprocessor/Slice' \
                       ./frozen_inference_graph.pb \
                       ./web_model
```
