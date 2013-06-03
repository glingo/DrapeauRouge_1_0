function SpriteAnimation(src, x, y, width, height){
	Item.call(this, x ,y, width, height);
	this.img = new Image();
	this.img.src = src;
	this.frame = this.img.height / this.height;
	this.state = 0;
	this.start = false;
}

extend(SpriteAnimation, Item);
SpriteAnimation.prototype.draw = function(){
	this.start = true;
	var sourceX = 0;
	if(this.start){
		var sourceY = this.state * this.height;
		this.ctx.drawImage(this.img, sourceX, sourceY, this.width, this.height, this.getX(), this.getY(), this.width, this.height);
		this.state +=1;
		if(this.state > this.frames - 1){
			this.state = 1;
		}
	}
	
};

SpriteAnimation.prototype.start = function(){
	this.draw();
};

SpriteAnimation.prototype.stop = function(){
	this.start = false;
};