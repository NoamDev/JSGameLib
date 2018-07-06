window.JSG={};
JSG.url=document.currentScript.src;
    // extract filename and callback parameter from the URL
    (function(){
		var matches = JSG.url.match(/callback=([^&]*)(&.*|$)/);
        // call the callback function
        JSG.callback=((matches!=null)?matches[1]:null);
	})();
JSG.h={}//help fuctions
JSG.h.loadScript=function(url, callback)
{
	var url="https://rawgit.com/NoamDev/JSGameLib/client-side/client/"+url;
	// get some kind of XMLHttpRequest
	var xhrObj = new XMLHttpRequest();
	// open and send a synchronous request
	xhrObj.open('GET', url, false);
	xhrObj.send('');
	eval(xhrObj.responseText);
}

JSG.h.loadScript("game.js",function(e){
	JSG.h.loadScript("sprite.js",function(e){
		JSG.h.loadScript("entity.js",function(e){
			JSG.h.loadScript("room.js",function(e){
				init();
			})
		})
	})
});