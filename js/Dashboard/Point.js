/**
 * Un Point, est représenté par deux coordonnées.
 */
function Point(x,y){
	this.x = x;
	this.y = y;
}

Point.prototype = new Point();
Point.prototype.constructor = Point;

Point.prototype.getX = function(){
	return this.x;
}

Point.prototype.getY = function(){
	return this.y;
}

Point.prototype.estAlligneX = function(point){
	return (point.x == this.x);
}

Point.prototype.estAlligneY = function(point){
	return (point.y == this.y);
}