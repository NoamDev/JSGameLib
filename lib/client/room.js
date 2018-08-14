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
			var speed_x=e.speed_x;
			var speed_y=e.speed_y;
 			var x=e.x+e.speed_x*dt/1000;
			var y=e.y+e.speed_y*dt/1000;
			if(x>width||y>height||x<-e.sprite.width||y<-e.sprite.height)
				e.dispatchEvent(new Event("out-of-room"));
			else if(x>width-e.sprite.width||y>height-e.sprite.height||x<0||y<0)
				e.dispatchEvent(new Event("room-border"));
			if(e.speed_x==speed_x&&e.speed_y==speed_y)
			{
				e.x=x;
				e.y=y;
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