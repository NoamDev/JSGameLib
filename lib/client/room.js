JSG.Room = class
  {
    constructor()
	{
		this.wallpaper = null;
		this.entities = [];
	}
	place(entity,x,y)
	{
		var e = new entity();
		e.element=new PIXI.Sprite(e.sprite.texture);
		e.x = x;
		e.y = y;
		e.speed_x=0
		e.speed_y=0
		console.log(e)
		this.entities.push(e);
	}
	create(stage)
	{
		for(var e of this.entities)
		{
			stage.addChild(e.element);
		}
		for(var e of this.entities)
		{
			e.dispatchEvent(new Event("create"))
		}
	}
	step(dt,height,width)
	{
 		for(var e of this.entities)
		{
			e.x_old=e.x;
			e.y_old=e.y;
			e.x+=e.speed_x*dt/1000;
			var x2=e.x+e.sprite.width;
			e.y+=e.speed_y*dt/1000;
			var y2=e.y+e.sprite.height;
			if(x2<0||e.x>width||y2<0||e.y>height)
			{
				e.dispatchEvent(new Event("out-of-room"));
			}
			else if(e.x<=0||x2>=width||e.y<=0||y2>=height)
			{
				e.dispatchEvent(new Event("intersect-border"));
			}
		}                                 
	}
	keyDown(key)
	{
		for(var e of this.entities)
		{
			e.dispatchEvent(new Event("key-down-"+key));
		}
	}
  }