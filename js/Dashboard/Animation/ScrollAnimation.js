function ScrollAnimation(src, x, y, width, height, vx){
	Item.call(this, x ,y, width, height);
	this.img = new Image();
	this.img.src = src;
	this.vx = vx;
	this.vxStart = vx;
	this.start = false;
}

extend(ScrollAnimation, Item);
ScrollAnimation.prototype.draw = function(){
	this.start = true;
	var sourceX = 0;
	
	if(this.start){

		var sourceY = this.img.height - Math.max(this.canvas.height, this.vx);
		console.log(this.img.height, sourceY, this.canvas.height, this.vx);
		this.ctx.drawImage(this.img, sourceX, sourceY, this.canvas.width, this.canvas.height, this.getX(), this.getY(), this.width, this.height);
		
		if(this.vx >= this.img.height){
			this.vx = this.vxStart;
		}
		this.vx += 5;
	}
	
};

ScrollAnimation.prototype.start = function(){
	this.draw();
};

ScrollAnimation.prototype.stop = function(){
	this.start = false;
};
