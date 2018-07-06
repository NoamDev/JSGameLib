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
      this.canvas=document.createElement("canvas");
	  this.ctx = this.canvas.getContext("2d");
      switch(arguments.length)
      {
		case 1://sent only container.
          this.setContainer(arguments[0])
		  break;
		case 2://sent only height and width.
		  this.setDimentions(arguments[0],arguments[1]);
		  break;
		 case 3://sent both container and height,width
  		  this.setDimentions(arguments[1],arguments[2]);
		  this.setContainer(arguments[0]);
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