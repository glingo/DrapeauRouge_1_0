function TripleCanon(x, y, width, height){
	Item.call(this, x ,y, width, height);
	this.tire = true;
}

extend(TripleCanon, Item);

TripleCanon.prototype.keyDown = function(e){
	var that = this;
	if(e.keyCode == 32 && this.tire ){
		this.tire = false;
		setTimeout(function(){
			that.tire = true;
		}, 250);
		var projectileC = clone(this.layer.asset.projectile);
		projectileC.name = projectileC.getUniqueID();
		var projectileH = clone(this.layer.asset.projectile);
		projectileH.name = projectileH.getUniqueID();
		var projectileB = clone(this.layer.asset.projectile);
		projectileB.getUniqueID();
		projectileB.name = projectileC.x = this.x;
		projectileC.y = this.y;
		projectileH.x = this.x;
		projectileH.y = this.y;
		projectileB.x = this.x;
		projectileB.y = this.y;
		projectileC.addForce(new Vecteur(1, 0));
		projectileC.vitesse = 6;
		projectileH.addForce(new Vecteur(3, 1));
		projectileH.vitesse = 6;
		projectileB.addForce(new Vecteur(3, -1));
		projectileB.vitesse = 6;
		for(var i = 0; i < this.ennemies.length; i++){
			projectileC.addEnnemy(this.ennemies[i]);
			projectileH.addEnnemy(this.ennemies[i]);
			projectileB.addEnnemy(this.ennemies[i]);
		}
		this.layer.addItem(projectileC);
		this.layer.addItem(projectileH);
		this.layer.addItem(projectileB);
	}
	
}