function Text(message, x, y, plain, color){
	Item.call(this, x ,y);
	this.message = message;
	this.font = new Font("10px", "sans sherif");
	this.plain = (plain == undefined) ? true : plain;
	this.color = color;
	this.width;
	this.textAlign = "start";
}

extend(Text, Item);
Text.prototype.draw = function(){
	this.ctx.font = this.font;
	this.ctx.fillStyle = this.color;
	this.ctx.textAlign = this.textAlign;
	if(this.plain){
		this.ctx.fillText(this.message, this.x, this.y);
	} else {
		this.ctx.strokeText(this.message, this.x, this.y);
	}
};

Text.prototype.init = function(){
	this.ctx.font = this.font;
	this.width = this.ctx.measureText(this.message).width;
	this.height = Number(this.font.taille.replace("px", ""));
};

Text.prototype.isOnIt = function(pointer){
	if(pointer.x > this.x && pointer.x < (this.x + this.width) && pointer.y > (this.y - this.height) && pointer.y < this.y) {
		return true;
	} else {
		return false;
	}
};