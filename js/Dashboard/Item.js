function Item(x, y, width, height){
	this.canvas;
	this.name = this.getUniqueID();
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;	
	this.ctx;
	this.draggable = false;
	this.movable = false; // Indique qu'un élément est déplaçable au clavier
	this.movableKey = {}; // Tableau associatif indiquant les touches utilisées pour le déplacement. ex : {"haut" : 38, "bas" : 40, "droite" : 39,  "gauche" : 37}
	this.moving = {"haut" : false, "bas" : false, "droite" : false,  "gauche" : false};
	this.difX = 0; // Calcule le différentiel de position entre la souris et le coin supérieur gauche d'un item
	this.difY = 0; // lors du clique sur un item.
	this.onDrag = false; // Détermine si un item est en phase de drop.
	this.children = new Array();
	this.onDie = new Publisher("ennemy");
	this.ennemies = new Array();
	this.isDie = false;
	this.isVisible = true;
	this._forces = new Array();
	this.vitesse = 1.5;
	this._forcesRefresh = false;
	this._ArrayResultante = [];
	this.insideCanvas = true;
	
};

/**
* function update of the item. This function updates all caractéristic of item during the loop.
* 2 Case, the first, item is movable, so we manage the moving by keyboard.
* The second, the item has one or more forces over it. In this case, we resolves this forces by calculating it resulting.
*/
Item.prototype.update = function(){
	if(this.movable){
		
		if(this.insideCanvas){
			if(this.moving["haut"] == true){
				if( this.y - 5 > 0){
					this.y = this.y - 5;
				} else {
					this.y = 0;
				}
			}
			if(this.moving["bas"] == true){
				if( this.y + this.height + 5 <= this.canvas.height){
					this.y = this.y + 5;
				} else {
					this.y = this.canvas.height - this.height;
				}
			}
			if(this.moving["droite"] == true){
				if( this.x + this.width + 5 <= this.canvas.width){
					this.x = this.x + 5;
				} else {
					this.x = this.canvas.width - this.width;
				}
			}
			if(this.moving["gauche"] == true){
				if( this.x - 5 > 0 ){
					this.x = this.x - 5;
				} else {
					this.x = 0;
				}
			}
		} else {
			if(this.moving["haut"] == true)
						   this.y = this.y - 5;
			if(this.moving["bas"] == true)
						   this.y = this.y + 5;
			if(this.moving["droite"] == true)
						   this.x = this.x + 5;
			if(this.moving["gauche"] == true)
						   this.x = this.x - 5;
		}
	} else if(this._forces.length > 0) { 
		if(this._forcesRefresh){
			var resultante = new Vecteur(this._forces[0].x, this._forces[0].y);
			// We add the vectors for calculate the resulting force
			for(var i=1; i<this._forces.length; i++){
						   resultante.add(this._forces[i]);
			}
			var x = 0;
			var y = 0;
			var absX = Math.abs(Number(resultante.x));
			var absY =  Math.abs(Number(resultante.y));
		  
			// We calculate the variations of x and y.
			if(absX > absY) {
			   x = Number(resultante.x) / absX;
			   y = Number(resultante.y) / absX;
			} else if(absY > absX){
			   x = Number(resultante.x) / absY;
			   y = Number(resultante.y) / absY;
			} else {
			   x = Number(resultante.x);
			   y = Number(resultante.y);
			}
			this._ArrayResultante["x"] = x;
			this._ArrayResultante["y"] = y;
			this._forcesRefresh = false;
		}
		
		// We update the position of the item taking into account of velocity
		this.setPosition(this.x + (this._ArrayResultante["x"]*this.vitesse), this.y+(this._ArrayResultante["y"]*this.vitesse));
	}
	this.draw();
};
Item.prototype.draw = function(){

};

Item.prototype.setPosition = function(x, y) {

	this.x = x;
	this.y = y;
};
Item.prototype.getUniqueID = function() {
	var uniqueID = new Date();
	return uniqueID.getTime() + '' + Math.floor(Math.random()*1000); 
	
};

Item.prototype.clear = function() {
	this.ctx.clearRect(this.x, this.y, this.width, this.height);
};

Item.prototype.isOnIt = function(pointer) {
	if(pointer.x > this.x && pointer.x < (this.x + this.width) && pointer.y > this.y && pointer.y < (this.y + this.height)) {
		return true;
	} else {
		return false;
	}
};

Item.prototype.mousePress = function(e){
	if(this.draggable) {
		this.difX = e.pageX - this.x;
		this.difY = e.pageY - this.y;
		this.onDrag = true;
	}
};

Item.prototype.mouseMove = function(e){
	if(this.onDrag) {
		this.x = e.pageX - this.difX;
		this.y = e.pageY - this.difY;
		//this.canvas.update();
	} else {
		if(this.isOnIt(new Pointer(e.pageX, e.pageY)) && this.draggable){
			this.canvas.style.cursor = "pointer";
		} else {
			this.canvas.style.cursor = "auto";
		}
	}
};

Item.prototype.mouseUp = function(e){
	if(this.onDrag){
		this.onDrag = false;
	}

};



Item.prototype.keyDown = function(e){
	if(this.movable){
		switch(e.keyCode){
			case this.movableKey["haut"] : // Haut
				e.preventDefault();
				this.moving["haut"] = true;
			break;
			case this.movableKey["bas"] : //Bas
				e.preventDefault();
				this.moving["bas"] = true;
			break;
			case this.movableKey["droite"] : // Droite
				e.preventDefault();
				this.moving["droite"] = true;
			break;
			case this.movableKey["gauche"] : // Gauche
				e.preventDefault();
				this.moving["gauche"] = true;
			break;
		}
	}
};

Item.prototype.keyUp = function(e){
	if(this.movable){
		switch(e.keyCode){
			case this.movableKey["haut"] : // Haut
				e.preventDefault();
				this.moving["haut"] = false;
			break;
			case this.movableKey["bas"] : //Bas
				e.preventDefault();
				this.moving["bas"] = false;
			break;
			case this.movableKey["droite"] : // Droite
				e.preventDefault();
				this.moving["droite"] = false;
			break;
			case this.movableKey["gauche"] : // Gauche
				e.preventDefault();
				this.moving["gauche"] = false;
			break;
		}
	}
};

Item.prototype.die = function(){

	this.isDie = true;
	this.onDie.deliver(this);
};

Item.prototype.addEnnemy = function(item){
	this.ennemies.push(item);
	this.subscribe(item.onDie);
};

Item.prototype.removeEnnemy = function(item){
	for(var i = 0; i < this.ennemies.length; i++){
		if(this.ennemies[i].name == item.name){
			this.ennemies.splice(i,1);
		}
	}
};

Item.prototype.addForce = function(vector){
	this._forcesRefresh = true;
	this._forces.push(vector);
};
Item.prototype.removeForces = function(vector){
	this._forcesRefresh = true;
	this._forces = new Vecteur(0,0);
};
/**
* Détermine si un item contient un autre.
*
*/
Item.prototype.contains = function(item){
	if(item.x > this.x && item.y > this.y && item.x < this.x + this.width && item.y < this.y+this.height)
		return true;
	else if(item.x+item.width > this.x && item.y > this.y && item.x+item.width < this.x + this.width && item.y < this.y+this.height)
		return true;
	else if(item.x > this.x && item.y+item.height > this.y && item.x < this.x + this.width && item.y+item.height < this.y+this.height)
		return true;
	else if(item.x+item.width > this.x && item.y+item.height > this.y && item.x+item.width < this.x + this.width && item.y+item.height < this.y+this.height)
		return true;
	else 
		return false;
};
Item.prototype.removeEvent = function(event){
	var mapEvent = EventListener.getInstance().subscribers.get(event);
	for(var i = 0; i < mapEvent.length     ; i++){
		if(mapEvent[i].name == this.name){
			mapEvent.splice(i, 1);
		}
	}
};

Item.prototype.addEvent = function(event){
	var eventMap = EventListener.getInstance().subscribers;
	if(!eventMap.containsKey(event)){
		eventMap.put(event, new Array());
	};
	EventListener.getInstance().subscribers.get(event).push(this);
};


Item.prototype.addEvents = function(events){
	for(var i = 0; i < events.length; i++){
		this.addEvent(events[i]);
	}
};


Item.prototype.addAllEvents = function(device){
	var desktop = ['keyDown', 'keyUp', 'keyPress', 'blur', 'change', 'click', 'contextMenu', 'copy', 'cut', 'dblClick', 'error', 'focus', 'focusin', 'focusout', 'load', 'mouseMove', 'mouseOut',
		'mouseOver', 'mouseUp', 'mouseWheel', 'mouseDown'];
	var keyBoard = ['keyDown', 'keyUp', 'keyPress', 'paste', 'copy', 'cut']
	var mouse = ['click', 'contextMenu', 'dblClick','mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'mouseWheel', 'mouseDown']
	var mobile = ['touchStart', 'touchEnd', 'touchMove'];
	var all = ['keyDown', 'keyUp', 'keyPress', 'blur', 'change', 'click', 'contextMenu', 'copy', 'cut', 'dblClick', 'error', 'focus', 'focusin', 'focusout', 'load', 'mouseMove', 'mouseOut',
		'mouseOver', 'mouseUp', 'mouseWheel', 'mouseDown', 'touchStart', 'touchEnd', 'touchMove'];
	switch(device){
		case 'desktop':
			for(var i = 0; i < desktop.length; i++){
				this.addEvent(desktop[i]);
			}
		break;
		case 'keyBoard':
			for(var i = 0; i < keyBoard.length; i++){
				this.addEvent(keyBoard[i]);
			}
		break;
		case 'mouse':
			for(var i = 0; i < mouse.length; i++){
				this.addEvent(mouse[i]);
			}
		break;
		case 'mobile':
			for(var i = 0; i < mobile.length; i++){
				this.addEvent(mobile[i]);
			}
		break;
		case 'all':
			for(var i = 0; i < all.length; i++){
				this.addEvent(all[i]);
			}
		break;
		default:
			for(var i = 0; i < desktop.length; i++){
				this.addEvent(desktop[i]);
			}
		break;
	}
};