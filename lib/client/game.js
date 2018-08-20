JSG.CollisionEvent=class extends Event{
	constructor(other)
	{
		super("collision");
		this.other=other;
		this.objectType=other.type;
	}
}
JSG.Game = class extends EventTarget
  {
	constructor(container,height,width)
    {
		super()
		this.app = new PIXI.Application({width: width, height: height});
		this.app.renderer.backgroundColor = 0x7f7f7f;
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
			var entity=e.type.create(e.x,e.y,this.entities.length,this);
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
	removeEntity(e)
	{
		this.app.stage.removeChild(e.element);
		this.entities.splice(e.id,1);
	}
	step(dt,height,width)
	{
		dt/=100;
 		for(var e of this.entities)
		{
			e.x_old=e.x;
			e.y_old=e.y;
			e.x+=e.speed_x*dt;
			var x2=e.x+e.sprite.width;
			e.y+=e.speed_y*dt+0.5*e.gravitation*dt*dt;
			e.speed_y+=e.gravitation*dt;
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
		var quadTree=new QuadTree({x:0,y:0,width:this.app.screen.width,height:this.app.screen.height});
		quadTree.insert(this.entities);
		this.detectCollision(quadTree);
	}
	detectCollision(quadTree) {
		function boundBox(quadTree,stack)
		{
			stack=stack||[];
			var objects=quadTree.objects;
			for(var i=0;i<quadTree.objects.length-1;++i)
			{
				for(var j=i+1;j<quadTree.objects.length;++j)
				{
					if (/* objects[x].collidableWith === obj[y].type && */
					(objects[i].x < objects[j].x + objects[j].width &&
					 objects[i].x + objects[i].width > objects[j].x &&
					 objects[i].y < objects[j].y + objects[j].height &&
					 objects[i].y + objects[i].height > objects[j].y)) {
					objects[i].dispatchEvent(new JSG.CollisionEvent(objects[j]));
					objects[j].dispatchEvent(new JSG.CollisionEvent(objects[i]));
					}
				}
			}
			for(var obj of stack)
				for(var i=0;i<obj.length;++i)
					for(var j=0;j<objects.length;++j)
						if (/* objects[x].collidableWith === obj[y].type && */
						(objects[j].x < obj[i].x + obj[i].width &&
						 objects[j].x + objects[j].width > obj[i].x &&
						 objects[j].y < obj[i].y + obj[i].height &&
						 objects[j].y + objects[j].height > obj[i].y)) {
							objects[j].dispatchEvent(new JSG.CollisionEvent(obj[i]));
							obj[i].dispatchEvent(new JSG.CollisionEvent(objects[j]));
						 }
			if(quadTree.nodes.length)
			{
				stack.push(objects);
				boundBox(quadTree.nodes[0],stack);
				boundBox(quadTree.nodes[1],stack);
				boundBox(quadTree.nodes[2],stack);
				boundBox(quadTree.nodes[3],stack);
				stack.splice(stack.length-1,1);
			}
		}
		/* var objects = [];
		quadTree.getAllObjects(objects);
		for (var x = 0, len = objects.length; x < len; x++) {
			var obj=[];
			quadTree.findObjects(obj, objects[x]);
			
			for (var y = 0, length = obj.length; y < length; y++) {
				// DETECT COLLISION ALGORITHM
				if (objects[x]!==obj[y]&&
					(objects[x].x < obj[y].x + obj[y].width &&
					 objects[x].x + objects[x].width > obj[y].x &&
					 objects[x].y < obj[y].y + obj[y].height &&
					 objects[x].y + objects[x].height > obj[y].y)) {
					objects[x].dispatchEvent(new JSG.CollisionEvent(obj[y]));
					obj[y].dispatchEvent(new JSG.CollisionEvent(objects[x]));
				}
			}
		} */
		boundBox(quadTree,[]);
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