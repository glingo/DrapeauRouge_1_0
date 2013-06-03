function Background(src, x, y, width, height, sx ,sy, swidth, sheight){
	Picture.call(this, src, x, y, width, height, sx ,sy, swidth, sheight);
};

extend(Background, Picture);

Background.prototype.draw = function(){
	this.sx = this.sx + 2.75; 
	this.parent.draw.call(this);
};
