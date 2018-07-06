JSG.Sprite = class
  {  
   constructor()//can be called with url or img too.
    {
		this.img=document.createElement('img');
		if(arguments.length >= 0)
			if(arguments[0] instanceof Image)
				this.img=arguments[0];
			else
			{
				this.img.src = arguments[0];
				var done = false;
				this.img.addEventListner('load',function(){
					done=true;
				})
				while(!done);
			}
    }
	set url(url)
    {
		this.img.src=url;
	}
	get url()
	{
		return this.img.src;
	}
  }