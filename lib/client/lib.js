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
		script.src=JSG.h.mydir+url;
		document.head.appendChild(script)
	});
	return promise;
}
JSG.h.mydir= document.currentScript.src.split('/').slice(0, -1).join('/')+'/';
JSG.loader={};
JSG.loader.res=[];
JSG.loader.load=function(arr){
	var promise=new Promise(function(resolve, reject) {
		PIXI.loader.add(arr).load(function(){
			for(var url of arr)
			{
				console.log(PIXI.loader.resources[url])
				JSG.loader.res[url]=PIXI.loader.resources[url].texture;
				resolve();
			}
		});
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
JSG.h.loadScript("pixi/pixi.min.js").then(
	()=>JSG.h.loadScript("game.js")).then(
	()=>JSG.h.loadScript("sprite.js")).then(
	()=>JSG.h.loadScript("entity.js")).then(
	()=>JSG.h.loadScript("room.js")).then(
	()=>load());
