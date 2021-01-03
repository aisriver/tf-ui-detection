
Hard Hat Sample - v3 2020-12-28 11:07pm
==============================

This dataset was exported via roboflow.ai on December 28, 2020 at 3:37 PM GMT

It includes 240 images.
Workers are annotated in Tensorflow TFRecord (raccoon) format.

The following pre-processing was applied to each image:
* Auto-orientation of pixel data (with EXIF-orientation stripping)
* Resize to 416x416 (Stretch)

The following augmentation was applied to create 3 versions of each source image:
* 50% probability of horizontal flip
* Randomly crop between 0 and 40 percent of the image
* Random rotation of between -15 and +15 degrees
* Random Gaussian blur of between 0 and 1.5 pixels


