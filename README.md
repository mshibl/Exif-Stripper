# Exif-Stripper
A lightweight Javascript package for stripping off exif data (image metadata) from any jpeg image
##### This plugin resues a portion of [Musa's](http://stackoverflow.com/users/1353011/musa) awesome answer to the question [How to Strip EXIF data from image](http://stackoverflow.com/questions/27638402/strip-exif-data-from-image) on SO

## Installation
  `npm install exif-stripper`

## Usage
  `var exifStripper = require('exif-stripper');`
  
  Simply call the `.strip` function that takes one argument (image url). This will return a promise, once resolved you can use `.then` to capture the response containing a blob url. The new url will point to the same image with all exif data stripped off.
  
  ```
  exifStripper.strip(IMAGE_URL)
    .then( function(response){ alert(response.url) });
  ```
  
