function ParticleManager(x, y, width, height) {
	Item.call(this,x, y, width, height);
    this.particles = new Array(); 
};

extend(ParticleManager,Item);

ParticleManager.prototype.createExplosion = function (posX, posY, particleSize, explosionSize, lifetime, speed, gravity) {
	// On calcule les coordonées où dessiner la particule afin de la centrer sur la position demandée 
	posX = posX - particleSize * .5; 
	posY = posY - particleSize * .5;
	var speed = particleSize * speed * .01;
	for (var i = 1; i < explosionSize; i++) { 
		for (var j = 0; j < (10 * i); j++) { 
			this.particles.push(new Particle({
			'x' : posX, 
			'y' : posY, 
			"width" : particleSize, 
			"height" : particleSize, 
			'speed' : i * speed, 
			'gravity' : gravity, 
			'lifetime' : lifetime
			})); 
		} 
	} 
};
	
ParticleManager.prototype.draw = function () { 
	var leavingParticles = []; 
	var color = new Array("yellow", "red", "black");
	for (var i = this.particles.length - 1; i >= 0; i--) { 
		this.particles[ i ].moves++; 
		this.particles[ i ].x += this.particles[ i ].xunits; 
		this.particles[ i ].y += this.particles[ i ].yunits + (this.particles[ i ].gravity * this.particles[ i ].moves);
		if (this.particles[ i ].moves < this.particles[ i ].life) { 
			leavingParticles.push(this.particles[ i ]); 
			this.ctx.globalAlpha = 5 / (this.particles[ i ].moves); 
			this.ctx.beginPath();
			this.ctx.arc( Math.floor(this.particles[ i ].x),  Math.floor(this.particles[ i ].y), this.particles[ i ].width,  0, 2 * Math.PI, true);
			this.ctx.closePath();
			this.ctx.fillStyle = color[Math.floor(Math.random() * 3)] ;
			this.ctx.fill();
			this.ctx.globalAlpha = 1; 
		}
	} 
	this.particles = leavingParticles; 
};


