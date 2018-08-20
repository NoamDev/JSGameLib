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
	bounce(collisionEvent)
	{
	
	}
	remove()
	{
		this.game.removeEntity(this);
	}
	constructor(x,y,id,game,type)
	{
		super();
		this.id=id;
		this.game=game;
		this.type=type;
		this.sprite=type.sprite;
		this.element=new PIXI.Sprite(this.sprite.texture);
		this.element.x=x;
		this.element.y=y;
		this.x_old=x;
		this.y_old=y;
		this.speed_x=0;
		this.speed_y=0;
		this.gravitation=0;
		if(type.solid)
			this.addEventListener("collision",function(event){event.other.x=event.other.x_old;event.other.y=event.other.y_old})
		for(var l of type.listeners)
		{
			this.addEventListener(l.event,l.callback)
		}
	}
	move(speed,angle)
		{
			this.speed_x=speed*Math.cos(angle * (Math.PI / 180))
			this.speed_y=-speed*Math.sin(angle * (Math.PI / 180))
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
			constructor(x,y,id,game)
			{
				super(x,y,id,game,self);
			}
		}
	}
	create(x,y,id,game)
	{
		var _class=this.Class;
		return new _class(x,y,id,game);
	}
	addEventListener(event,callback)
	{
		this.listeners.push({event:event,callback:callback});
	}
}