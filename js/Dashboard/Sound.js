function Sound(src, x, y, width, height){
	Item.call(this, x ,y, width, height);
	this.src = src;
}

extend(Sound, Item);