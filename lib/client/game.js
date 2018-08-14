JSG.Game = class extends EventTarget
  {
    //set the tag which the game's canvas should be in.
	setContainer(tag)
    {
      tag.appendChild(this.canvas);
    }
	setDimentions(height,width)
	{
	   this.canvas.height=height;
	   this.canvas.width=width;
	}
	showProgress()
	{
	   if(this.done==this.resources)
		{
			this.dispatchEvent(new Event('load'));
		}
		console.log(100*this.done/this.resources+"%")
	}
	constructor(container,height,width)
    {
		super()
		this.app = new PIXI.Application({width: width, height: height});
		this.dt=50;
		this.Rooms = [];
		this.canvas=this.app.view;
		container.appendChild(this.app.view);
		//this.ctx = this.canvas.getContext("2d");
    }
	addRoom(room)
	{
		this.Rooms.push(room);
	}
	setRoom(id)
	{
		this.curRoom=this.Rooms[id];
		this.curRoom.create(this.app.stage);
		this.curRoom.step(this.dt);
		setInterval(()=>this.curRoom.step(this.dt),this.dt)
	}
	clear()
	{
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	start()
	{
		this.setRoom(0);
	}
  }