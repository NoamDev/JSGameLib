window.JSG={};
JSG.url=document.currentScript.src;
    // extract filename and callback parameter from the URL
    (function(){
		var matches = JSG.url.match(/callback=([^&]*)(&.*|$)/);
        // call the callback function
        JSG.callback=((matches!=null)?matches[1]:null);
	})();
JSG.h={}//help fuctions
JSG.h.loadScript=
function(url)
{
	promise=new Promise(function(resolve, reject) {
		script=document.createElement("script");
		script.addEventListener('load',resolve);
		script.src=url;
		document.head.appendChild(script)
	});
	return promise;
}





/* function(url, callback)
{
	var url="https://rawgit.com/NoamDev/JSGameLib/client-side/client/"+url;
	// get some kind of XMLHttpRequest
	var xhrObj = new XMLHttpRequest();
	// open and send a synchronous request
	xhrObj.open('GET', url, false);
	xhrObj.send('');
	eval(xhrObj.responseText);
} */

JSG.h.loadScript("game.js").then(
	()=>JSG.h.loadScript("sprite.js")).then(
	()=>JSG.h.loadScript("entity.js")).then(
	()=>JSG.h.loadScript("room.js")).then(
	()=>init());