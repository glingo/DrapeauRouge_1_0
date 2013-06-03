function Container(x, y, width, height){
	Item.call(this, x ,y, width, height);
}

extend(Container, Item);
Container.prototype.draw = function(){
	for(var i = 0; i < this.children.length; i++){
			this.children[i].draw();
	}
};

