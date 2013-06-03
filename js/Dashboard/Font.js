function Font(taille, type){
	this.taille = taille;
	this.type = type;
}

Font.prototype.toString = function(){
	return this.taille +" "+this.type;
};
