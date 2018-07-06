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
	paint(ctx)
	{
		for(var e of this.entities)
		{
			game.ctx.drawImage(circle.img,10,10);
		}
	}
  }