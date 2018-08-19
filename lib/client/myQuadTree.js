class QuadTree{
	constructor()
	{
		this.nodes=[];
		this.objects=[];
	}
	node(e)
	{
		var R=(e.x>this.width/2);
		var L=(e.x2<=this.width/2);
		var D=(e.y>this.height/2);
		var U=(e.y2<=this.width/2);
		//as clear R&&L||U&&D =false
		if(L&&U)
		{
			//left-up quad
			return 0;
		}
		if(L&&D)
		{
			//left-down quad
			return 1;
		}
		if(R&&U)
		{
			//right-up quad
			return 2;
		}
		if(R&&D)
		{
			//right-down quad
			return 3;
		}
		return -1;
	}
	insert(e)
	{
		var arr=this.getAreas(e);
	}
	
}