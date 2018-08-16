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
	startRoom(id)
	{
		this.app.stage.removeChildren();
		this.curRoom=this.Rooms[id];
		this.entities=[]
		for(var e of this.curRoom.entities)
		{
			var entity=e.type.create(e.x,e.y);
			this.app.stage.addChild(entity.element);
			this.entities.push(entity);
			entity.dispatchEvent(new Event("create"));
		}
		var self=this;
		setInterval(function(){self.step(self.dt,self.app.screen.height,self.app.screen.width)},this.dt)
		/* this.curRoom.create(this.app.stage);
		this.curRoom.step(this.dt,this.app.screen.height,this.app.screen.width);
		setInterval(()=>this.curRoom.step(this.dt,this.app.screen.height,this.app.screen.width),this.dt) */
	}
	keyDown(key)
	{
		for(var e of this.entities)
		{
			e.dispatchEvent(new Event("key-down-"+key));
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
	start()
	{
		this.startRoom(0);
		var self=this;
		document.addEventListener("keydown",function(event){
			self.keyDown(event.key);
		}) 
	}
  }