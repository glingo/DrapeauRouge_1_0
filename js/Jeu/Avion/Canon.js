function Canon(x, y, width, height){
	Item.call(this, x ,y, width, height);
	this.tire = true;
}

extend(Canon, Item);

Canon.prototype.keyDown = function(e){
	var that = this;
	if(e.keyCode == 32 && this.tire ){
		this.tire = false;
		setTimeout(function(){
			that.tire = true;
		}, 250);
		var projectile = clone(this.layer.asset.projectile);
		projectile.x = this.x;
		projectile.y = this.y,
		projectile.addForce(new Vecteur(1, 0));
		projectile.vitesse = 6;
		for(var i = 0; i < this.ennemies.length; i++){
			projectile.addEnnemy(this.ennemies[i]);
		}
		this.layer.addItem(projectile);
	}
	
}