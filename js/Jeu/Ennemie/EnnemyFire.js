function EnnemyFire(src, x, y, width, height, sx ,sy, swidth, sheight){
	Picture.call(this, src, x ,y, width, height, sx ,sy, swidth, sheight);
	this.life = 2;
	this.vitesse = 2;
	
	this.flag = false;
	var that = this;
	this.id = setInterval(function(){
		that.flag = false;
	}, 5000);
}

extend(EnnemyFire, Picture);

EnnemyFire.prototype.update = function(){
	var that = this;
	
	if(!this.flag){
		this.flag = true;
		this.shoot();
	}
	this.comportement();
	if(this.x + this.width < 0 ||
		this.y + this.height < 0 ||
			this.y > this.canvas.height)
	{
		this.isDie = true;
		this.onDie.deliver(this);
	}	
	this.parent.update.call(this);
}

EnnemyFire.prototype.die = function(){
	clearTimeout(this.id);
	this.life--;
	if(this.life <= 0){
		Score.getInstance().addScore(10);
		this.layer.particuleManager.createExplosion(this.x + this.width, this.y + this.height, 1, 5, 10, 100, 0);
		this.isDie = true;
		this.onDie.deliver(this);
		
	}
};


EnnemyFire.prototype.shoot = function(){
	var that = this;
	var avion = (function(fg){
		// On récupère l'avion pour le différencier des autres items.
		for(var i = 0 ; i < fg.getItems().length ; i++){
			var item = fg.getItems()[i];
			if(item instanceof Avion){
				return item;
			}
		}
	}(that.layer));
	var projectile = clone(that.layer.asset.projectile);
	var dirY = Math.floor(Math.random() * 3);
	var sens = Math.floor(Math.random() * 2);
	console.log(sens);
	sens = (sens == 1 )? -1 : 1;
	var coef = (dirY != 0 ? dirY : 1);
	projectile.addForce(new Vecteur(-1 * coef, sens * dirY));
	projectile.x =  that.x
	projectile.y =  that.y + that.height/2;
	projectile.color = "black";
	projectile.vitesse = 6;
	projectile.name = projectile.getUniqueID();
	if(avion != undefined){
	avion.addEnnemy(projectile);
	}
	that.layer.addItem(projectile);
	return function(){};
};

EnnemyFire.prototype.comportement = function(){
	
};