function LinearGradient(x, y, width, height, colors){
	Item.call(this, x ,y, width, height);
	this.colors = colors;
}

extend(LinearGradient, Item);
LinearGradient.prototype.draw = function(){
	this.ctx.fillStyle = this.gr;
	this.ctx.fillRect(this.x, this.y, this.width, this.height);
};


LinearGradient.prototype.init = function(){
	this.gr = this.ctx.createLinearGradient(this.x, this.y, 0, this.height);
	for(var i = 0; i < this.colors.length; i++){
		this.gr.addColorStop(0, this.colors[i]);
		this.gr.addColorStop(1, this.colors[i]);
	}
};