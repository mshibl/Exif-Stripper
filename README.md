# Exif-Stripper
A lightweight Javascript plugin for stripping off exif data (image metadata) from any jpeg image

##### *This plugin resues a portion of [Musa's](http://stackoverflow.com/users/1353011/musa) awesome answer to the question [How to Strip EXIF data from image](http://stackoverflow.com/questions/27638402/strip-exif-data-from-image) on SO*

## Installation
  `npm install exif-stripper`

## Usage
  `var exifStripper = require('exif-stripper');`
  
  Simply call the `.strip` function that takes one argument (image url). This will return a promise, once resolved you can use `.then` to capture the response containing a blob url. The new url will point to the same image with all exif data stripped off.
  
  ```
  exifStripper.strip(IMAGE_URL)
    .then( function(response){ alert(response.url) });
  ```

## What is EXIF?
  Short answer: it is the metadata attached to any photo taken by a digital camera (including smartphones)
  
  Exif stands for (Exchangeable image file format) and can contain a wide range of infomration, such as (location where image was taken, original orientation, the type of camera used, etc.)
  For more infomration, read [Description of Exif file format](http://www.media.mit.edu/pia/Research/deepview/exif.html)
  
## Why strip off EXIF?
  You'll find many opinions about why exif data should be stripped off images. Those opinions mostly revolve around privacy concerns.
  
  My personal motiviation for stripping off exif data from images is to avoid images being displayed differently across different operating systems. 
  
  For example, iOS takes the exif orientation value into account before displaying an image. On the other side, Android ignores this value altogether. This means that the same image will be displayed differently across different devices, and you will have no easy way of knowing/controlling this.
  
  Read this article [EXIF Orientation Handling Is a Ghetto
](http://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/) by [Dave Perrett](http://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/) where he explains why this is a big problem. And I quote him:
> *"The problem is that there doesn’t seem to be any consensus on how to handle these orientation tags on the web. Results vary wildly across sites, between different products from the same company, between browsers, and even within a single browser depending on context (yes I’m looking at you Safari). Images with the same orientation value may also be rotated differently on some sites depending on whether they’re landscape or portrait."*
