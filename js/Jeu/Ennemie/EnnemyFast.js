function EnnemyFast(src, x, y, width, height, sx ,sy, swidth, sheight){
	Picture.call(this, src, x ,y, width, height, sx ,sy, swidth, sheight);
	this.life = 1;
	this.vitesse = 6;
}

extend(EnnemyFast, Picture);

EnnemyFast.prototype.update = function(){
	if(this.x + this.width < 0 ||
		this.y + this.height < 0 ||
			this.y > this.canvas.height)
	{
		this.isDie = true;
		this.onDie.deliver(this);
	}	
	this.parent.update.call(this);
}

EnnemyFast.prototype.die = function(){
	this.life--;
	if(this.life <= 0){
		Score.getInstance().addScore(10);
		this.layer.particuleManager.createExplosion(this.x + this.width, this.y + this.height, 1, 10, 10, 100, 0);
		this.isDie = true;
		this.onDie.deliver(this);
		
	}
};

EnnemyFast.prototype.comportement = function(){
	
};