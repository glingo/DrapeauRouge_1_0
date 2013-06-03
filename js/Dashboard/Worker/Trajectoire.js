onmessage = function(event){
	console.log(event);
	var resultante = new Vecteur(this.forces[0].x, this.forces[0].y);
	for(var i=1; i<this.forces.length; i++){
		resultante.add(i);
	}
	var distanceCanvas = new Vecteur(this.canvas.width, this.canvas.height).distance(new Vecteur(0, 0));
	var distance = resultante.distance(new Vecteur(0, 0));
	console.log(distance/distanceCanvas*10);
	var y = Number(resultante.y) / Number(resultante.x);*/
	//postMessage(new Point(this.x = (this.x + 1) + (distance/distanceCanvas*10), this.y = (this.y + y) + (distance/distanceCanvas*10)));
	postMessage("toto");
};