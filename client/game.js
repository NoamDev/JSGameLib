JSG.Game = class
  {
    //set the tag which the game's canvas should be in.
   setContainer(tag)
    {
      tag.appendChild(canvas);
    }
   setDimentions(height,width)
   {
	   this.canvas.height=height;
	   this.canvas.width=width;
   }   
   //constructor(), constructor(container), constructor(height, width) or constructor(container,height,width)
   constructor()
    {
      this.canvas=document.createElement("canvas");      
      switch(arguments.length)
      {
		case 1://sent only container.
          setContainer(arguments[0])
		  break;
		case 2://sent only height and width.
		  setDimentions(arguments[0],arguments[1]);
		  break;
		 case 3://sent both container and height,width
  		  setDimentions(arguments[1],arguments[2]);
		  setContainer(arguments[0]);
      }
    }
	start()
	{
		
	}
    
  }