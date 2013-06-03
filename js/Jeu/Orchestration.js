function Orchestration(master){
	this.time;
	this.niveau = 0;
	this.master = master;
	this.fg = this.master.getLayers()[1];
	this.start = 15;
	this.endTime = 60*3 - 15;
	this.avion = (function(fg){
		// On récupère l'avion pour le différencier des autres items.
		for(var i = 0 ; i < fg.getItems().length ; i++){
			var item = fg.getItems()[i];
			if(item instanceof Avion){
				return item;
			}
		}
	}(this.fg));
	this.avion.onCrash.subscribers.push(this);
	var font50 = new Font("50px", "sans sherif");
	var font16 = new Font("16px", "sans sherif");
	this.welcome = new Text("Bienvenue au Nevada pour l'entrainement aérien du Drapeau Rouge. Vous avez été sélectionné pour participer à ce prestigieux exercice.", 0, 50, true, "white");
	this.welcome.font = font16;
	
	this.welcomeL2 = new Text("Dans cet entrainement vous serez aux commandes du Rafale, fleuron de l'armée française. Alors , prêt!", 0, 100, true, "white");
	this.welcomeL2.font = font16;
	
	this.ready = new Text("Ready ! ", 0, 50, true, "white");
	this.ready.font = font50;
	
	this.ready3 = new Text("3", 0, 50, true, "white");
	this.ready3.font = font50;
	
	this.ready2 = new Text("2", 0, 50, true, "white");
	this.ready2.font = font50;
	
	this.ready1 = new Text("1", 0, 50, true, "white");
	this.ready1.font = font50;
	
	this.go = new Text("Go !", 0, 50, true, "white");
	this.go.font = font50;
	
	this.matrice = new Matrice();
		
	this.generiqueL1 = new Text("Le jeu Drapeau Rouge vous a été présenté par le Centre Informatique du Service du Matériel de l'armée de l'air", 0,-60, true, "white");
	this.generiqueL1.font = font16;
	
	this.generiqueL2 = new Text("Il a été développé par le Sergent Le Baro et le Sergent Cailly", 0,-80, true, "white");
	this.generiqueL2.font = font16;
	
	this.generiqueL3 = new Text("Nous remercions particulièrement : Notre hiérarchie pour nous avoir soutenu au cours du développement. ", 0,-20, true, "white");
	this.generiqueL3.font = font16;
};
 
Orchestration.prototype.generique = function(){
	var font50 = new Font("50px", "sans sherif");
	this.scoreTxt = new Text("Votre score est de :" + Score.getInstance().score, window.innerWidth/2, window.innerHeight/2, true, "white");
	this.scoreTxt.font = font50;
	this.fg.addItem(this.scoreTxt);
	
	this.fg.addItem(this.generiqueL1);
	this.generiqueL1.init();
	this.generiqueL1.x = Math.floor(window.innerWidth/2 - this.generiqueL1.width /2);
	this.generiqueL1.y = Math.floor(window.innerWidth/2 - this.generiqueL1.width /2);
	
	this.fg.addItem(this.generiqueL2);
	this.generiqueL2.init();
	this.generiqueL2.x = Math.floor(window.innerWidth/2 - this.generiqueL2.width /2);
	this.generiqueL2.y = Math.floor(window.innerWidth/2 - this.generiqueL2.width /2-40);
	
 	this.fg.addItem(this.generiqueL3);
	this.generiqueL3.init();
	this.generiqueL3.x = Math.floor(window.innerWidth/2 - this.generiqueL3.width /2);
	this.generiqueL3.y = Math.floor(window.innerWidth/2 - this.generiqueL3.width /2);
 };
Orchestration.prototype.loadVagues = function(){
	var that = this;
	if(this.niveau == 0 && this.time ==  2){
		this.fg.addItem(this.welcome);
		this.welcome.init();
		this.welcome.x = Math.floor(window.innerWidth/2 - this.welcome.width /2);
		
	} else if(this.niveau == 0 && this.time == 5){
		this.fg.addItem(this.welcomeL2);
		this.welcomeL2.init();
		this.welcomeL2.x = Math.floor(window.innerWidth/2 - this.welcomeL2.width /2);
		
	} else if(this.niveau == 0 && this.time ==  9){
		this.fg.addItem(this.ready);
		this.ready.init();
		this.fg.removeItem(this.welcome);
		this.fg.removeItem(this.welcomeL2);
		this.ready.x = Math.floor(window.innerWidth/2 - this.ready.width /2);
		
	} else if(this.niveau == 0 && this.time ==  10){
		this.fg.addItem(this.ready3);
		this.ready3.init();
		this.fg.removeItem(this.ready);
		this.ready3.x = Math.floor(window.innerWidth/2 - this.ready3.width /2);
		
	} else if(this.niveau == 0 && this.time ==  11){
		this.fg.addItem(this.ready2);
		this.ready2.init();
		this.fg.removeItem(this.ready3);
		this.ready2.x = Math.floor(window.innerWidth/2 - this.ready2.width /2);
		
	} else if(this.niveau == 0 && this.time ==  12){
		this.fg.addItem(this.ready1);
		this.ready1.init();
		this.fg.removeItem(this.ready2);
		this.ready1.x = Math.floor(window.innerWidth/2 - this.ready1.width /2);
		
	} else if(this.niveau == 0 && this.time ==  13){
		this.fg.addItem(this.go);
		this.go.init();
		this.fg.removeItem(this.ready1);
		this.go.x = Math.floor(window.innerWidth/2 - this.go.width /2);
		this.avion.movable = true;
		Score.getInstance().start = true;
	} else if(this.niveau == 0 && this.time ==  this.start){			// 1 diagonaleGD
		this.fg.removeItem(this.go);
		for(var i = 0; i < 7; i++){
			var ennemy = clone(this.fg.asset.ennemyLow);
			ennemy.x  = window.innerWidth + i *50 ;
			ennemy.y = (window.innerHeight - 50)  + 50 * -i;
			ennemy.name = ennemy.getUniqueID();
			this.fg.addItem(ennemy);
			ennemy.addForce(new Vecteur(-1,0));
			this.avion.addEnnemy(ennemy);
		}
	} else if(this.niveau == 0 && this.time ==  this.start + 10){		// 2 diagonaleDG
		for(var i = 0; i < 7; i++){
			var ennemy = clone(this.fg.asset.ennemyLow);
			ennemy.x  = window.innerWidth + 50 * i;
			ennemy.y =  50 + 50 * i;
			ennemy.name = ennemy.getUniqueID();
			this.fg.addItem(ennemy);
			ennemy.addForce(new Vecteur(-1, 0));
			this.avion.addEnnemy(ennemy);
		}
	}  else if(this.niveau == 0 && this.time ==  this.start + 20){		// 3
		for(var i = 0; i < 10; i++){
			var ennemy = clone(this.fg.asset.ennemyLow);
			ennemy.x  = window.innerWidth + 50 * i;
			ennemy.y =  window.innerHeight + 50 * -i;
			ennemy.name = ennemy.getUniqueID();
			this.fg.addItem(ennemy);
			ennemy.addForce(new Vecteur(-3, -1));
			this.avion.addEnnemy(ennemy);
		}
	} else if(this.niveau == 0 && this.time ==  this.start + 30){				//4    DELTA				
		this.matrice.add(0, 3, 1)
			.add(1, 2, 1)
			.add(2, 1, 1)
			.add(3, 0, 1)
			.add(1, 4, 1)
			.add(2, 5, 1)
			.add(3, 6, 1);
		new Vague(this.fg, this.avion, this.matrice, window.innerHeight/3, 180, 80);
	} else if(this.niveau == 0 && this.time ==  this.start + 40){ // 5
		this.matrice.clear();
		this.matrice.add(0, 0, 1)
			.add(0, 1, 1)
			.add(0, 2, 1)
			.add(0, 3, 1)
			.add(0, 4, 1)
			.add(0, 5, 1)
			.add(0, 6, 1);
		new Vague(this.fg, this.avion, this.matrice, window.innerHeight/3, 180, 80);
	} else if(this.niveau == 0 && this.time ==  this.start + 50){ // 6
		this.matrice.clear();
		this.matrice.add(0, 0, 1)
			.add(0, 1, 1)
			.add(0, 2, 1)
			.add(0, 3, 1)
			.add(0, 4, 1)
			.add(0, 5, 1)
			.add(0, 6, 1)
			.add(1, 0, 1)
			.add(1, 1, 1)
			.add(1, 2, 1)
			.add(1, 3, 1)
			.add(1, 4, 1)
			.add(1, 5, 1)
			.add(1, 6, 1);
		new Vague(this.fg, this.avion, this.matrice, window.innerHeight/3, 180, 80);
		var tc = new TripleCanon();
		tc.addEvent("keyDown");
		this.avion.setCanon(tc);
	} else if(this.niveau == 0 && this.time ==  this.start + 60){ // 7 
		this.matrice.clear();
		this.matrice.add(0, 3, 1)
			.add(1, 2, 3)
			.add(1, 4, 3)
			.add(2, 1, 1)
			.add(2, 5, 1)
			.add(3, 0, 3)
			.add(3, 6, 3);
		new Vague(this.fg, this.avion, this.matrice, window.innerHeight/3, 180, 80);
	}else if(this.niveau == 0 && this.time ==  this.start + 70){  //8
		this.matrice.clear();
		this.matrice.add(0, 3, 3)
			.add(1, 2, 3)
			.add(2, 1, 3)
			.add(3, 0, 3)
			.add(1, 4, 3)
			.add(2, 5, 3)
			.add(3, 6, 3)
			.add(4, 7, 2)
			.add(5, 1, 2);
		new Vague(this.fg, this.avion, this.matrice, window.innerHeight/3-150, 180, 80);
	}else if(this.niveau == 0 && this.time ==  this.start + 80){ // 9 
		this.matrice.clear();
		this.matrice.add(0, 3, 1)
			.add(1, 2, 1)
			.add(2, 1, 1)
			.add(3, 0, 1)
			.add(1, 4, 1)
			.add(2, 5, 1)
			.add(3, 6, 1)
			.add(1, 3, 3)
			.add(2, 2, 3)
			.add(2, 4, 3)
			.add(3, 2, 3)
			.add(3, 3, 3)
			.add(3, 4, 3)
			.add(4, 7, 2)
			.add(5, 1, 2);
		new Vague(this.fg, this.avion, this.matrice, window.innerHeight/3-150, 180, 80);
	}else if(this.niveau == 0 && this.time ==  this.start + 90){
		this.matrice.clear();
		this.matrice.add(0, 4, 1)
			.add(1, 2, 1)
			.add(1, 6, 1)
			.add(3, 4, 1)
			.add(5, 2, 1)
			.add(5, 3, 3)
			.add(5, 5, 3)
			.add(5, 6, 1)
			.add(7, 4, 1)
			.add(9, 2, 1)
			.add(9, 6, 1);
		new Vague(this.fg, this.avion, this.matrice, window.innerHeight/3, 180, 80);
	}else if(this.niveau == 0 && this.time ==  this.start + 100){
		this.matrice.clear();
		this.matrice.add(1, 4, 1)
			.add(2, 3, 1)
			.add(2, 5, 1)
			.add(3, 2, 1)
			.add(3, 4, 3)
			.add(3, 6, 1)
			.add(4, 1, 1)
			.add(4, 3, 3)
			.add(4, 4, 3)
			.add(4, 5, 3)
			.add(4, 7, 1)
			.add(5, 2, 1)
			.add(5, 4, 3)
			.add(5, 6, 1)
			.add(6, 3, 1)
			.add(6, 5, 1)
			.add(7, 4, 1);
		new Vague(this.fg, this.avion, this.matrice, window.innerHeight/3, 180, 80);
	}else if(this.niveau == 0 && this.time ==  this.start + 110){
		this.matrice.clear();
		this.matrice.add(1, 4, 1)
			.add(2, 3, 1)
			.add(2, 5, 1)
			.add(3, 2, 1)
			.add(3, 4, 3)
			.add(3, 6, 1)
			.add(4, 1, 1)
			.add(4, 3, 3)
			.add(4, 4, 3)
			.add(4, 5, 3)
			.add(4, 7, 1)
			.add(5, 2, 1)
			.add(5, 4, 3)
			.add(5, 6, 1)
			.add(6, 3, 1)
			.add(6, 5, 1)
			.add(4, 7, 2)
			.add(5, 1, 2)
			.add(7, 4, 1);
		new Vague(this.fg, this.avion, this.matrice, window.innerHeight/3-150, 180, 80);
	}else if(this.niveau == 0 && this.time == this.endTime - 10 ){
		Score.getInstance().start = false;
		this.generique();
	}else if(this.niveau == 0 && this.time == this.endTime){
		this.master.stop();
		//this.saveScore(Score.getInstance().score);
	}
};

Orchestration.prototype.saveScore = function(score){
	console.log("toto" + window.location);
	window.location = "save.php?nom="+this.master.nom+"&adresse="+this.master.adresse+"&score="+score;
	/*$.ajax({
		type: "POST",
        url : "save.php",
		data : {
				nom : "romain",
				adresse : "test",
				score : score
		}
	}).done(function(msg){
		alert("Data Saved: " + msg);
	}).fail(function(msg){
		alert("Error" + msg);
	});*/
};


Orchestration.prototype.crash = function(){
	Score.getInstance().start = false;
	this.master.getTimer().time = this.endTime - 11;
	
};
 
Orchestration.prototype.setTime = function(newTime){
	this.time = newTime;
	this.loadVagues();
};

