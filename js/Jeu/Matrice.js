function Matrice(){
	this.tab = new Array();
};

Matrice.prototype.add = function(x, y, value){
	if(this.tab[x] == null ||this.tab[x] == undefined){
		this.tab[x] = new Array();
	}
	this.tab[x][y] = value;
	return this;
};


Matrice.prototype.get = function(x,y){
	if(this.tab[x] == null ||this.tab[x] == undefined){
		return null
	} else {
		return this.tab[x][y];
	}
};

Matrice.prototype.clear = function(){
	this.tab = new Array();
};