function SimpleLoader(){
    var ressources ;
	
	this.getRessources = function(){
		return ressources;
	};
	
	this.setAllRessources = function(newRessources){
		ressources = newRessources;
	};
};

SimpleLoader.prototype.init = function (ressources){
	this.setAllRessources(ressources);
};

SimpleLoader.prototype.draw = function (){
	var that = this;
	var ctx = this.getRessources()[0].ctx;
	var canvas = this.getRessources()[0].canvas;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0,0, canvas.width, canvas.height)
	for(var i = 0; i < this.getRessources().length; i++){
		var data = this.getRessources()[i];
		if(data instanceof Picture){
			var drawLoader = function(nbLoad){
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = "black";
				ctx.fillRect(0,0, canvas.width, canvas.height);
				ctx.fillStyle = "white";
				ctx.fillText("Chargement en cours ... " + Number(nbLoad) +"/"+ Number(100), canvas.width/2, 100 );

			}
			data.img = new Image();
			data.img.src = data.src;
			data.img.onload = drawLoader(Number(i)+1); //Update loader to reflect picture loading progress
		} else if(data instanceof Video){
			/* Load video */
		} else if(data instanceof Sound){
			/* Load sound */
		}else {
		
		}
	}
};