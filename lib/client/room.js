JSG.Room = class
  {
    constructor()
	{
		this.wallpaper = null;
		this.entities = [];
	}
	place(entity,x,y)
	{
		this.entities.push({type:entity,x:x,y:y});
	}
  }