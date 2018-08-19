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
	get x2()
	{
		return this.element.x+this.sprite.width;
	}
	get y2()
	{
		return this.element.y+this.sprite.height;
	}
	get height()
	{
		return this.sprite.height;
	}
	get width()
	{
		return this.sprite.width;
	}
	constructor(x,y,object)
	{
		super();
		this.type=object;
		this.sprite=object.sprite;
		this.element=new PIXI.Sprite(object.sprite.texture);
		this.element.x=x;
		this.element.y=y;
		this.x_old=x;
		this.y_old=y;
		this.speed_x=0;
		this.speed_y=0;
		if(object.solid)
			this.addEventListener("collision",function(event){event.other.x=event.other.x_old;event.other.y=event.other.y_old})
		for(var l of object.listeners)
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
		this.solid=false;
		var self=this;
		this.Class= class extends JSG.abstractEntity
		{
			constructor(x,y)
			{
				super(x,y,self);
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