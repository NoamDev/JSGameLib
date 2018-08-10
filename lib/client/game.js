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
	image(url)
	{
	   var self =this
	   this.resources=this.resources || 0;
	   this.done=this.done || 0;
	   var img = new Image();
	   var res = {
		   type:"image",		   
		   img:img
	   };
	   img.addEventListener("load",function(){
			   ++self.done
			   self.showProgress()
		   });
	   img.src=url
	   ++this.resources;
	   return res;
	}
	constructor()
    {
		super()
		this.dt=100;
		this.Rooms = [];
		this.canvas=document.createElement("canvas");
		this.canvas.height=arguments[1]
		this.canvas.width=arguments[2]
		arguments[0].appendChild(this.canvas)
		this.ctx = this.canvas.getContext("2d");
    }
	addRoom(room)
	{
		this.Rooms.push(room);
	}
	setRoom(id)
	{
		this.curRoom=this.Rooms[id];
		this.curRoom.create();
		this.curRoom.paint(this.ctx,this.dt);
	}
	clear()
	{
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	repaint()
	{
		this.clear()
		this.curRoom.paint(this.ctx,this.dt)
	}
	start()
	{
		this.addEventListener("load",function(){
			if(this.Rooms.length==0)
				console.log("can't start game with no rooms.")
			else
			{
				this.setRoom(0);
				var self=this;
				setInterval(function(){self.repaint()},this.dt)
			}
		});
		this.showProgress()
	}
  }