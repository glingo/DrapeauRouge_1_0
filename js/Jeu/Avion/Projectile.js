function Projectile(x, y, width, height,color){
	Item.call(this, x ,y, width, height);
	this.color = color;
	this.collision = new Collision("AABBCollision");
	
}

extend(Projectile, Item);

Projectile.prototype.draw = function(){
	this.ctx.beginPath();
	this.ctx.arc( Math.floor(this.x),  Math.floor(this.y), 3, 3, 2 * Math.PI, true);
	this.ctx.closePath();
	this.ctx.fillStyle = this.color ;
	this.ctx.fill();
};

Projectile.prototype.update = function(){
	if(this._ArrayResultante.x > 0){
		if(this.x + this.width > this.canvas.width)
		{
			this.isDie = true;
			this.onDie.deliver(this);
		}	
		if(this.y < 0){
			this.die();
		}
		for(var i = 0; i< this.ennemies.length; i++){
			var item = this.ennemies[i];
			if(this.collision.touch(this, item)){
				item.die();
				this.die();
			}
		}
	} else {
		if(this.x + this.width < 0)
		{
			this.isDie = true;
			this.onDie.deliver(this);
		}	
	}
	this.parent.update.call(this);
}
