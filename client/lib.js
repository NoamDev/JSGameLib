var JSG =
{
  Game:class
  {
    //set the tag which the game's canvas should be in.
   setContainer(tag)
    {
      tag.appendChild(canvas);
    }
    
   //constructor(), constructor(container), constructor(height, width) or constructor(container,height,width)
   constructor()
    {
      this.canvas=document.createElement("canvas");      
      switch(arguments.length)
      {
        case 1://sent only container
          setContainer(arguments[0])
          break;
      }
    }
    
  }
};
