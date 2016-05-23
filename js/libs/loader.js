/**
 * Loader - simple ajax functions implementation
 *
 * @package rfo/libs
 # -*- coding: utf-8 -*-
 # @Author: ricardo7k@yahoo.com.br
 # @Date:   2016-05-23 15:00:00
 # @Last Modified by: ricardo7k@yahoo.com.br
 # @Last Modified time: 2016-05-23 15:00:00
 */

rfo.Loader = {
	params: {},
	method: "POST",
	xhr: "",
	url: "",
  callback: {
      error: function(s) { console.info(s) },
      done: function(s) { console.info(s) }
  },
	dataURLtoBlob: function(dataURL)
	{
		var binary = atob(dataURL.split(',')[1]);
		var array = [];
		for(var i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], {type: 'image/png'});
	},
	getXHR: function() {
    if (window.XMLHttpRequest) {
      return new window.XMLHttpRequest;
    } else {
      try {
          return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (ex) {
          return null;
      }
    }
  },
  handler: function() {
    if (Load.xhr.readyState == 4) {
      if (Load.xhr.status == 200) {
        Load.callback.done(Load.xhr);
      } else {
        Load.callback.error("ErrorLoad(#002) - " + Load.xhr + " , " + Load.xhr.status);
      }
    }
  },
	save: function($url)
	{
    this.url = $url;
    this.xhr = this.getXHR();
    if (this.xhr != null) {
      var paramsString = "rnd=" + Math.random();
  		for (var i in this.params) {
      	if(i) paramsString += "&" + i + "=" + encodeURI(this.params[i]);
			}
	    this.xhr.open(this.method, this.url + (this.method=="GET"?(this.url.indexOf("?")>0?"&":"?") + paramsString:""), true);
	    this.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	    var type = this.method=="POST"?paramsString:null;
	    this.xhr.send(type);
	    this.xhr.onreadystatechange = this.handler;
    } else {
      this.callback.error("ErrorLoad(#001) - Ajax not supported.");
    }
	}
}
