JSG.Game = class
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
   //constructor(), constructor(container), constructor(height, width) or constructor(container,height,width)
   constructor()
    {
	  this.Rooms = [];
      this.canvas=arguments[0];
	  this.ctx = this.canvas.getContext("2d");
      }
    }
	addRoom(room)
	{
		this.Rooms.push(room);
	}
   start()
	{
		if(this.Rooms.length==0)
			console.log("can't start game with mo rooms.")
		else
		{
			this.Rooms[0].paint(this.ctx);
		}
	}
    
  }