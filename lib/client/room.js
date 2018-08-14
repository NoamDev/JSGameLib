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
	step(dt)
	{
 		for(var e of this.entities)
		{
 			e.x+=e.speed_x*dt/1000;
			e.y+=e.speed_y*dt/1000; 
		} 
	}
  }