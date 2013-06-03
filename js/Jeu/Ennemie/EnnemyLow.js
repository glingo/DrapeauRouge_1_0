function EnnemyLow(src, x, y, width, height, sx ,sy, swidth, sheight){
	Picture.call(this, src, x ,y, width, height, sx ,sy, swidth, sheight);
	this.life = 3;
	this.vitesse = 2;
}

extend(EnnemyLow, Picture);

EnnemyLow.prototype.update = function(){
	this.comportement();
	if(this.x + this.width < 0 ||
		this.y + this.height < 0 ||
			this.y > this.canvas.height)
	{
		this.isDie = true;
		this.onDie.deliver(this);
	}	
	this.parent.update.call(this);
}

EnnemyLow.prototype.die = function(){
	this.life--;
	if(this.life <= 0){
		Score.getInstance().addScore(10);
		this.layer.particuleManager.createExplosion(this.x + this.width, this.y + this.height, 1, 5, 5, 50, 0);
		this.isDie = true;
		this.onDie.deliver(this);
		
	}
};


EnnemyLow.prototype.comportement = function(){
	
};