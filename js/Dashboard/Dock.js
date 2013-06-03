function Dock(side, x ,y, width, height){
	Container.call(this, x ,y, width, height);
	this.side = side;
}

extend(Dock, Container);
Dock.prototype.draw = function(){
	var loading = function(ctx, x, y, width, height) {
		ctx.drawImage(img, x, y, width, height);
	};
	switch(this.side){
		case 0 : 
			var img = new Image();
			img.src = "img/doc.png";
			img.onload = loading(this.ctx, this.x, this.y, this.width, this.height);
			img.onerror = 
			img.onabort = function() {
				alert("Erreur lors du chargement");
			};
		break;
		case 1 : 
		
		break;
		case 2 : 
		
		break;
		case 3 : 
		
		break;
	}
};

Dock.prototype.addIcon = function(item){
		this.listItem[0] = item;
};
