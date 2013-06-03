function Particle (data) { 
    var angle = Math.floor(Math.random() * 360); 
    var radians = angle * Math.PI / 180;
	this.width = data['width']; 
    this.height = data['height']; 
	this.x = data['x']; 
    this.y = data['y']; 
    // Vitesse de déplacement de la particule 
	this.speed = data['speed']; 
       // Durée de vie de la particule 
    this.life = data['lifetime']; 
       // Valeur de la gravitée appliquée sur les particules 
    this.gravity = data['gravity'] ;
        // Compteur de rafraichissement 
    this.moves =  0; 
        // Déplacement en X 
    this.xunits =  Math.cos(radians) * this.speed;
        // Déplacement en Y 
    this.yunits =  Math.sin(radians) * this.speed ;
};
