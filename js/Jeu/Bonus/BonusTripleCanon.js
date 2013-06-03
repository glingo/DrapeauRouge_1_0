function BonusTripleCanon(src, x, y, width, height, sx ,sy, swidth, sheight){
	BonusTripleCanon.call(this, src, x ,y, width, height, sx ,sy, swidth, sheight);
	this.collision = new Collision("AABBCollision");
	
}

extend(BonusTripleCanon, Picture);


BonusTripleCanon.prototype.update = function(){
}

BonusTripleCanon.prototype.draw = function(){
	var radius = 50;
	var r = this.x + this.width;
	var b = this.y + this.height;
	this.ctx.beginPath();
	this.ctx.moveTo(this.x + radius, this.y);
	this.ctx.lineTo(r-radius, this.y);
	this.ctx.quadraticCurveTo(r, this.y, r, this.y + radius);
	this.ctx.lineTo(r, this.y + this.height - radius);
	this.ctx.quadraticCurveTo(r, b, r-radius, b);
	this.ctx.lineTo(this.x+radius, b);
	this.ctx.quadraticCurveTo(this.x, b, this.x, b-radius);
	this.ctx.lineTo(this.x, this.y+radius);
	this.ctx.quadraticCurveTo(this.x, y, this.x+radius, this.y);
	this.ctx.stroke();
}