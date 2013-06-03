function Picture(src, x, y, width, height, sx ,sy, swidth, sheight){
	this.sx = sx;
	this.sy = sy
	this.swidth = swidth;
	this.sheight = sheight;
	Item.call(this, x ,y, width, height);
	this.src = src;
}

extend(Picture, Item);

Picture.prototype.draw = function(){
	var that = this;
	var go1 = function(){
		if(that.sx != null){
			that.ctx.drawImage(that.img, that.sx, that.sy, that.swidth, that.sheight, that.x, that.y, that.width, that.height);
		} else {
			that.ctx.drawImage(that.img, that.x, that.y, that.width, that.height);
		}
	}

	var go = function(){
		if(that.sx != null){
			that.ctx.drawImage(that.img, that.sx, that.sy, that.swidth, that.sheight, that.x, that.y, that.width, that.height);
		} else {
			that.ctx.drawImage(that.img, that.x, that.y, that.width, that.height);
		}
	}
	if(this.img == undefined) {
		this.img = new Image();
		this.img.src = this.src;
		this.img.onload = go;
	} else{
		go1();
	}
};
