'use strict';

/**
 * Strips Exif off Jpeg images
 * @param {string} imageUrl
 * @return {string} blobUrl
 */

module.exports = (function(){
	function _removeExif(imageArrayBuffer,dv){
	    var offset = 0, recess = 0;
	    var pieces = [];
	    var i = 0;
	    if (dv.getUint16(offset) == 0xffd8){
	        offset += 2;
	        var app1 = dv.getUint16(offset);
	        offset += 2;
	        while (offset < dv.byteLength){
	            if (app1 == 0xffe1){
	                
	                pieces[i] = {recess:recess,offset:offset-2};
	                recess = offset + dv.getUint16(offset);
	                i++;
	            }
	            else if (app1 == 0xffda){
	                break;
	            }
	            offset += dv.getUint16(offset);
	            var app1 = dv.getUint16(offset);
	            offset += 2;
	        }
	        if (pieces.length > 0){
	            var newPieces = [];
	            pieces.forEach(function(v){
	                newPieces.push(imageArrayBuffer.slice(v.recess, v.offset));
	            }, this);
	            newPieces.push(imageArrayBuffer.slice(recess));
	            var br = new Blob(newPieces, {type: 'image/jpeg'});
	            return URL.createObjectURL(br)
	        }
	    }
	}

	return{
		strip: function(imageUrl){
		    var imageData = $.Deferred()
		    var xhr = new XMLHttpRequest();
		    imageUrl = imageUrl.replace(/^http:\/\//i, 'https://');
		    
		    xhr.open( "GET", imageUrl, true );
		    xhr.responseType = "arraybuffer";

		    xhr.onload = function( e ) {
		        var dataView = new DataView(this.response)
		        var blobUrl = _removeExif(this.response, dataView)
		        imageData.resolve(blobUrl)
		    }

		    xhr.send();
		    return imageData.promise()
		}
	}
}())