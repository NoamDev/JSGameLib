JSG.abstractEntity=class extends EventTarget
{
	get x()
	{
		return this.element.x;
	}
	set x(x)
	{
		return this.element.x=x;
	}
	set y(y)
	{
		return this.element.y=y;
	}
	get y()
	{
		return this.element.y;
	}
	constructor(x,y,sprite,listeners)
	{
		super();
		this.sprite=sprite;
		this.element=new PIXI.Sprite(sprite.texture);
		this.element.x=x;
		this.element.y=y;
		this.speed_x=0;
		this.speed_y=0;
		for(var l of listeners)
		{
			this.addEventListener(l.event,l.callback)
		}
	}
	move(speed_x,speed_y)
		{
			this.speed_x=speed_x
			this.speed_y=speed_y
		}
}

JSG.Entity=class
{
	constructor()
	{
		this.sprite=null;
		this.listeners=[];
		var self=this;
		this.Class= class extends JSG.abstractEntity
		{
			constructor(x,y)
			{
				super(x,y,self.sprite,self.listeners);
			}
		}
	}
	create(x,y)
	{
		var _class=this.Class;
		return new _class(x,y);
	}
	addEventListener(event,callback)
	{
		this.listeners.push({event:event,callback:callback});
	}
}