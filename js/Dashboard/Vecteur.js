function Vecteur(x, y){
    this.x = x;
	this.y = y;
};

Vecteur.prototype.setNull = function(){
	this.init(0, 0);
};


Vecteur.prototype.setVector = function(v){
	this.x = v.x;
	this.y = v.y;
	return this;
};


Vecteur.prototype.add = function(v){
	this.x += v.x;
	this.y += v.y;
	return this;
};


Vecteur.prototype.sub = function(v){
	this.x -= v.x;
	this.y -= v.y;
	return this;
};

Vecteur.prototype.scale = function(v){
	this.x *= v.x;
	this.y *= v.y;
	return this;
};

Vecteur.prototype.div = function(v){
	this.x /= v.x;
	this.y /= v.y;
	return this;
};

Vecteur.prototype.abs = function(){
	if (this.x < 0)
		this.x = -this.x;
	if (this.y < 0)
		this.y = -this.y;
	return this;
};


Vecteur.prototype.minV = function(v){
	this.x = this.x < v.x ? this.x : v.x;
	this.y = this.y < v.y ? this.y : v.y;
	return this;
};

Vecteur.prototype.maxV = function(v){
	this.x = this.x > v.x ? this.x : v.x;
	this.y = this.y > v.y ? this.y : v.y;
	return this;
};

Vecteur.prototype.floorSelf = function(){
	this.x = ~~this.x;
	this.y = ~~this.y;
	return this;
};

Vecteur.prototype.ceilSelf = function(){
	this.x = Math.ceil(this.x);
	this.y = Math.ceil(this.y);
	return this;
};

Vecteur.prototype.negateSelf = function(){
	this.x = -this.x;
	this.y = -this.y;
	return this;
};

Vecteur.prototype.copy = function(v){
	this.x = v.x;
	this.y = v.y;
	return this;
};

Vecteur.prototype.equals = function(v){
	return ((this.x === v.x) && (this.y === v.y));
};

Vecteur.prototype.length = function(){
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vecteur.prototype.normalize = function(){
	var len = this.length();
	// some limit test
	if (len < Number.MIN_VALUE) {
		return 0.0;
	}
	var invL = 1.0 / len;
	this.x *= invL;
	this.y *= invL;
	return len;
};

Vecteur.prototype.dotProduct = function(v){
	return this.x * v.x + this.y * v.y;
};

Vecteur.prototype.distance = function(v){
	return Math.sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
};

Vecteur.prototype.angle  = function(v){
	return Math.atan2((v.y - this.y), (v.x - this.x));
};

Vecteur.prototype.toString  = function(){
	return 'x:' + this.x + ',y:' + this.y;
};