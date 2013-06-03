window.onload = function(){
	var login = document.getElementById("login"); 
	login.onsubmit =  function(event){
		var nom = document.getElementById("username").value;
		var adresse = document.getElementById("password").value;
		event.preventDefault();
		login.style.display = "none";
		
		// Instanciation du jeu
		var dash = new SimplyCanvas();
		dash.nom = nom;
		dash.adresse = adresse;
		// Ajout des differentes couches au jeu.
		var bg = new Layer({ // background
			"name" : "background",
			"width" : window.innerWidth,
			"height" : window.innerHeight,
			"priority" : 1,
			"top" : "0px",
			"left" : "0px",
			"right" : null,
			"bottom":null
		});
		
		var solLayer = new Layer({ // background
			"name" : "sol",
			"width" : window.innerWidth,
			"height" : 573,
			"priority" : 2,
			"top" : null,
			"left" : "0px",
			"right" : null,
			"bottom": "0px"
		});
		dash.addLayer(solLayer);
		
		var fg = new Layer({ // Foreground
			"name" : "foreground",
			"width" : window.innerWidth, 
			"height" : window.innerHeight, 
			"priority" : 3,
			"top" : "0px",
			"left" : "0px",
			"right" : null,
			"bottom": null
		});
		dash.addLayer(fg);
		
		// Ajout du particuleManager pour gerer les explosions
		var pm = new ParticleManager(0,0,window.innerWidth,window.innerHeight);
		fg.addItem(pm);
		fg.particuleManager = pm;
		
		// Initialisation des assets intancier par la suite.
		var projectile = new Projectile(0, 0, 3, 3, "red");
		var ennemyLow = new EnnemyLow("img/mig.png", 0 , 0, 70, 20, 35 , 60, 425, 120);
		var ennemyFast = new EnnemyFast("img/mirage.png", 0 , 0, 70, 20, 0 , 20, 485, 170);
		var ennemyFire = new EnnemyFire("img/f14.png", 0 , 0, 96, 20, 0 , 0, 405, 83);
		
		// Ajout d'asset
		var asset = {"projectile" : projectile, "ennemyLow" : ennemyLow, "ennemyFast" : ennemyFast,  "ennemyFire" : ennemyFire};
		fg.asset = asset;
		
		// création de l'avion du joueur
		var avion = new Avion(window.innerWidth/2 - 64, window.innerHeight / 2, 128, 50);
		avion.setCorps(new Picture("img/rafale.png", 250, 325, 128,  50, 0, 250, 485, 250));
		//avion.movable = true;
		avion.movableKey = {"haut" : 38, "bas" : 40, "droite" : 39,  "gauche" : 37};
		avion.addAllEvents("keyboard");
		var canon = new Canon();
		canon.addEvent("keyDown");
		avion.setCanon(canon);
		fg.addItem(avion);
		
		
		// Initialisation de l'orchestration du jeu.
		var orchest = new Orchestration(dash);
		orchest.subscribe(dash.getTimer());
		
		// Initialisation du score du jeu.
		var score = Score.getInstance();
		score.subscribe(dash.getTimer());
		score.setLayer(fg);
		
		// Ajout du décor sur le backGround;
		var background = new Background("img/sol.png", 0, 0, window.innerWidth,  573, 0, 0,  window.innerWidth, 573);
		solLayer.addItem(background);
		
		var ciel = new LinearGradient(0, 0,window.innerWidth,  window.innerHeight, new Array("#b9d0e7", "#2b7dc0"));
		bg.addItem(ciel);
		ciel.init();
		bg.update();
		/*var ciel = new LinearGradient(0, 0,window.innerWidth,  window.innerHeight/3 * 2, new Array("#EF7C41", "#000000"));
		bg.addItem(ciel);
		var soleil = new RadialGradient(0, 0, 0 , 0);
		bg.addItem(soleil);
		var sol = new LinearGradient(0, window.innerHeight/3 * 2, window.innerWidth,  5,  new Array("#452E12", "#5BAF65"));
		bg.addItem(sol);
		var herbe = new LinearGradient(0, window.innerHeight/3 * 2 + 4,window.innerWidth,  window.innerHeight/3 - 4,  new Array("#4E5B2F", "#452E12"));
		bg.addItem(herbe);
		ciel.init();
		soleil.init();
		sol.init();
		herbe.init();*/
		
		// lancement du jeu
		dash.start();
	};
};
