class ETClass extends Function
{
	constructor()
	{
		console.log(new.target)
		var obj={listeners:[]}
		Object.setPrototypeOf(EventTarget,new.target.prototype)
		var res= class extends EventTarget
		{
			constructor()
			{
				super()
				for(var l in obj.listeners)
				{
					var val=obj.listeners[l]
					this.addEventListener(val.event,val.callback);
				}
			}
		}
		res.addEventListener=function(event,callback){
			this.listeners.push({event:event,callback:callback});
		}
		res.listeners=obj.listeners;
		return res;
	}
}

ETClass.prototype.addEventListener=function(event,callback){
		this.listeners.push({event:event,callback:callback});
	}



JSG.Entity = class extends ETClass
  {
   addProp(name, val)
	{
		this.prototype[name]=(typeof val !=='undefined'?val:null);
	}
	get sprite()
	{
		return this.sprite
	}
	set sprite(sprite)
	{
		this.prototype.sprite = sprite;
	}
    constructor()
	{
		super();
		this.prototype.sprite = null;
		this.prototype.visible = true;
		this.prototype.x = null;
		this.prototype.y = null;
		this.prototype.speed=0;
		this.prototype.move=function(speed)
		{
			this.speed=speed
		}
    }
  }
