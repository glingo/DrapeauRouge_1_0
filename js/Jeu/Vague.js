function Vague(layer, avion, matrice, y, decX, decY){
	this.layer = layer;
	this.matrice = matrice;
	this.y = y; // Postion du premier item. 
	this.decX = decX;
	this.decY = decY;
	this.avion = avion;
	this.init();
};

Vague.prototype.init = function(){
	for(var i = 0; i < this.matrice.tab.length; i++){
		if(this.matrice.tab[i] != undefined){
			for(var j =0; j < this.matrice.tab[i].length; j++){
				var cell = this.matrice.tab[i][j];
			
				if(cell != 0 && cell != undefined && cell != null){
					var ennemy;
					switch(cell){
						case 1: // EnnemyLow
							ennemy = clone(this.layer.asset.ennemyLow);
							ennemy.addForce(new Vecteur(-6, 0));
						break;
						case 2: // EnnemyFast
							ennemy = clone(this.layer.asset.ennemyFast);
							ennemy.addForce(new Vecteur(-4, 0));
						break;
						case 3: // EnnemyFire
							ennemy = clone(this.layer.asset.ennemyFire);
							ennemy.addForce(new Vecteur(-6, 0));
						break;
					}
					ennemy.x  = window.innerWidth + this.decY * i;
					ennemy.y = this.y + this.decY * j;
					ennemy.name = ennemy.getUniqueID();
					this.layer.addItem(ennemy);
					
					this.avion.addEnnemy(ennemy);
				}		
			}
		}
	}
};
