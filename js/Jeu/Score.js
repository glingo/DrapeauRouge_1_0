function Score(){
	this.instance = null;
	this.score = 0;
	this.time;
	this.layer = null;
	this.scoreAffiche = null;
	this.start = false;
};

Score.getInstance = function(){
	if(this.instance == null){
		this.instance = new Score();
	}
	return this.instance;
};

Score.prototype.setTime = function(newTime){
	if(this.start){
		this.time = newTime;
		this.addScore(1);
	}
};

Score.prototype.addScore = function(number){
	this.score = this.score + number;
	if(this.layer != null){
		this.scoreAffiche.message = "Score : " + this.score;
	}
}

Score.prototype.setLayer = function(layer){
	this.layer = layer;
	this.scoreAffiche = new Text("Score : 0", window.innerWidth - 150, 50, true, "white");
	this.scoreAffiche.font = new Font("25px", "sans sherif");
	this.layer.addItem(this.scoreAffiche);
}