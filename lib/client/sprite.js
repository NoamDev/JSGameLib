JSG.Sprite = class
  {  
   constructor(texture)//can be called with url or img too.
    {
		this.texture=texture;
    }
	get height()
	{
		return this.texture.height;
	}
	get width()
	{
		return this.texture.width;
	}
  }