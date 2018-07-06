JSG.Entity = class extends Function
  {
   addProp(name, val)
	{
		this.prototype[name]=(typeof val !=='undefined'?val:null);
	}
   constructor()
	{
		super();
		this.prototype.sprite = null;
		this.prototype.visible = true;
		this.prototype.x = null;
		this.prototype.y = null;
    }
	set sprite(sprite)
	{
		this.prototype.sprite = sprite;
	}
  }