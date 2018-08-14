JSG.Game = class extends EventTarget
  {
	constructor(container,height,width)
    {
		super()
		this.app = new PIXI.Application({width: width, height: height});
		this.app.renderer.backgroundColor = 0x1affff;
		this.dt=50;
		this.Rooms = [];
		this.canvas=this.app.view;
		container.appendChild(this.app.view);
    }
	addRoom(room)
	{
		this.Rooms.push(room);
	}
	setRoom(id)
	{
		this.curRoom=this.Rooms[id];
		this.curRoom.create(this.app.stage);
		this.curRoom.step(this.dt,this.app.screen.height,this.app.screen.width);
		setInterval(()=>this.curRoom.step(this.dt,this.app.screen.height,this.app.screen.width),this.dt)
	}
	clear()
	{
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	start()
	{
		this.setRoom(0);
		var self=this;
		 document.addEventListener("keydown",function(event){
			self.curRoom.keyDown(event.key);
		}) 
	}
  }