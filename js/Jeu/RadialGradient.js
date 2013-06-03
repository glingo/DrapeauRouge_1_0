function RadialGradient(x, y, width, height){
	Item.call(this, x ,y, width, height);
	this.grd;
}

extend(RadialGradient, Item);
RadialGradient.prototype.draw = function(){
	this.ctx.beginPath();
	this.ctx.arc(this.canvas.width / 2, this.canvas.height/3*2, 70, 0, 2 * Math.PI, true);
	this.ctx.closePath();
	this.ctx.fillStyle = this.grd;
	this.ctx.fill();
};


RadialGradient.prototype.init = function(){
	this.grd = this.ctx.createRadialGradient(10, 15, 5, 20, 30, 50);
	this.grd.addColorStop(0, "white");
	this.grd.addColorStop(1, "yellow");
};