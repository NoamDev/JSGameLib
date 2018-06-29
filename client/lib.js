window.JSG=(typeof JSG !== 'undefined'?JSG:{});
    // extract filename and callback parameter from the URL
    (function(){
	var matches = document.currentScript.src.match(/callback=([^&]*)(&.*|$)/);
        // call the callback function
        JSG.callback=((matches!=null)?matches[1]:null);
	})();
JSG.h={}//help fuctions
JSG.h.loadScript=function(url, callback)

{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

JSG.h.loadScript("game.js",function(e){
	if(JSG.callback!=null)
		(window[JSG.callback])()
});