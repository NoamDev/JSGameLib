window.JSG={};
JSG.url=document.currentScript.src;
    // extract filename and callback parameter from the URL
    (function(){
		var matches = JSG.url.match(/callback=([^&]*)(&.*|$)/);
        // call the callback function
        JSG.callback=((matches!=null)?matches[1]:null);
	})();
JSG.h={}//helpers
JSG.h.mydir= document.currentScript.src.split('/').slice(0, -1).join('/')+'/';

JSG.h.loadScript=function(url)
{
	promise=new Promise(function(resolve, reject) {
		script=document.createElement("script");
		script.addEventListener('load',resolve);
		script.src=JSG.h.mydir+url;
		document.head.appendChild(script)
	});
	return promise;
}
JSG.loader={};
JSG.loader.res=[];
JSG.loader.load=function(arr){
	var promise=new Promise(function(resolve, reject) {
		PIXI.loader.add(arr).load(function(){
			for(var url of arr)
			{
				JSG.loader.res[url]=PIXI.loader.resources[url].texture;
				resolve();
			}
		});
	});
	return promise;
}

JSG.h.loadScript("pixi/pixi.min.js").then(
	()=>JSG.h.loadScript("game.js")).then(
	()=>JSG.h.loadScript("sprite.js")).then(
	()=>JSG.h.loadScript("entity.js")).then(
	()=>JSG.h.loadScript("room.js")).then(
	()=>JSG.h.loadScript("quadTree.js")).then(
	()=>load());
