JSG.Sprite = class
  {  
   constructor(resource)//can be called with url or img too.
    {
		this.texture=null;
		var self=this;
		resource.load.then(function(){
			self.texture=resource.res.texture;
		})
    }
  }