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
		e.x = x;
		e.y = y;
		this.entities.push(e);
	}
	create(stage)
	{
		for(var e of this.entities)
		{
			e.element=new PIXI.Sprite(e.sprite.texture);
			e.element.x=e.x;
			e.element.y=e.y;
			stage.addChild(e.element);
		}
		for(var e of this.entities)
		{
			e.dispatchEvent(new Event("create"))
		}
	}
	paint(dt)
	{
		for(var e of this.entities)
		{
			e.x+=e.speed_x*dt/1000;
			e.y+=e.speed_y*dt/1000;
		}
	}
  }