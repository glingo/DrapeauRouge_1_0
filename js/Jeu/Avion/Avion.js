function Avion(x, y, width, height){
	Container.call(this, x ,y, width, height);
	this.collision = new Collision("AABBCollision");
	this.life = 3; 
	this.onCrash = CrashListener.getInstance();
}

extend(Avion, Container);

Avion.prototype.draw = function(){
	for(var i = 1; i< this.life+1; i++){
		this.drawHeart(i * 50,30);
	}
	var corps = this.children[0];
	corps.x = this.x;
	corps.y = this.y;
	var canon = this.children[1];
	canon.x =  this.x + this.width;
	canon.y = this.y + this.height/3 * 2;
	this.parent.draw.call(this);
};

Avion.prototype.setCorps = function(corps){
	this.children[0] = corps;
};

Avion.prototype.setCanon = function(canon){
	this.removeCanon();
	this.children[1] = canon;
	if(this.ctx != undefined){
		this.children[1].ctx = this.ctx;
		this.children[1].canvas = this.canvas;
		this.children[1].layer = this.layer;
	}
	for(var i =0; i< this.ennemies.length; i++){
		this.children[1].addEnnemy(this.ennemies[i]);
	}
};

Avion.prototype.removeCanon = function(){
	if(this.children[1] != undefined){
		//this.children.ennemies = null;
		this.children[1].removeEvent("keyDown");
	}
};

Avion.prototype.addMissile = function(missile){
	if(this.children[2] == undefined){
		this.children[2] = new Array();
	}
	this.children[2].push(missile);
};


Avion.prototype.addEnnemy = function(ennemy){
	this.parent.addEnnemy.call(this, ennemy);
	this.children[1].addEnnemy(ennemy);
};


Avion.prototype.update = function(){
	for(var i = 0; i< this.ennemies.length; i++){
		var item = this.ennemies[i];
		
		if(this.collision.touch(this, item)){
			item.life = 0;
			item.die();
			this.life--;
		}
	}
	if(this.life == 0){
		this.layer.particuleManager.createExplosion(this.x, this.y, 1, 10, 10, 100, 0);
		this.die();
		this.removeCanon();
		this.onCrash.deliver();
	}
	if(this.moving["bas"]){
		this.children[0].sy = 500;
	} else if(this.moving["haut"]){
		this.children[0].sy = 0;
	} else {
		this.children[0].sy = 250;
	}
	
	this.parent.update.call(this);
};

Avion.prototype.drawHeart = function(x, y){
	this.ctx.strokeStyle = '#FF0000'; // rouge, évidemment  
	this.ctx.lineWidth = 3;  
	  
	this.ctx.beginPath();  
	this.ctx.arc(x, y, 5, 90*(Math.PI/180), 0*(Math.PI/180), false);  
	this.ctx.stroke();  
	this.ctx.closePath();  
	  
	this.ctx.beginPath();  
	this.ctx.arc(x, y +10, 5, 270*(Math.PI/180), 0*(Math.PI/180), false);  
	this.ctx.stroke();  
	this.ctx.closePath();  
	  
	this.ctx.beginPath();  
	this.ctx.arc(x + 10, y, 5, Math.PI, 90*(Math.PI/180), false);  
	this.ctx.stroke();  
	this.ctx.closePath();  
	  
	this.ctx.beginPath();  
	this.ctx.arc(x + 10, y +10, 5, 180*(Math.PI/180), 270*(Math.PI/180), false);  
	this.ctx.stroke();  
	this.ctx.closePath();  
};

