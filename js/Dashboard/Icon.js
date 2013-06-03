function Icon(src, x, y, width, height){
	Container.call(this, x ,y, width, height);
	this.src = src;
	this.collision = new Collision("AABBCollision");
};

extend(Icon, Container);
Icon.prototype.update = function(){
	for(var i = 0; i<this.ennemies.length; i++){
		if(this.collision.touch(this, this.ennemies[i])){
			this.ennemies[i].die();
			console.log("vie - 1");
		}
	}
	this.parent.update.call(this);
}

Icon.prototype.draw = function(){
	var children = this.children;
	// On initialise la police du text pour récuperer la taille.
	children[0].init();
	// On redéfinit la taille de l'icone par rapport à celle de l'image ou du texte.
	this.width = (children[1].width > children[0].width) ? children[1].width :children[0].width;
	this.height = children[1].height + children[0].height + 10;
	
	// On positionne l'image par rapport à l'icone
	children[1].x = this.x + (this.width - children[1].width)/2;
	children[1].y = this.y;
	
	// On positionne le texte dans l'icone
	children[0].x = this.x + (this.width - children[0].width)/2;
	children[0].y = this.y + children[1].height + children[0].height;
	// On affiche l'icon.
	for(var i = 0; i < children.length; i++){
			children[i].draw();
	}
	
	//this.ctx.strokeRect(this.x, this.y, this.width, this.height);
};

Icon.prototype.addText = function(item){
	this.children[0] = item;
	return this;
};


Icon.prototype.addPicture = function(item){
	this.children[1] = item;
	return this;
};

Icon.prototype.mouseUp = function(e){
	this.parent.mouseUp.call(this);
	if(this.parent.contains(this)){
		//console.log("dedans");
	} else {
		//console.log("dehors");
	}
};

Icon.prototype.dblclick = function(e){
	if(this.src != undefined) {
		window.open(this.src);
	}
};
