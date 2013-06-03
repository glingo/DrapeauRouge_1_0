
function Layer(data){
	
	var that = this;
	var master;
	this.name = data['name'];
	var items = new Array();
	this.canvas = document.createElement("canvas");
	this.canvas.id = name;
	this.canvas.height = data['height'];
	this.canvas.width = data['width'];
	this.canvas.style.position = 'absolute';
	if (data['top'] != null ) { this.canvas.style.top = data['top'] };
	if (data['left'] != null ) {this.canvas.style.left = data['left'] };
	if (data['right'] != null ) {this.canvas.style.right = data['right'] };
	if (data['bottom'] != null ) {this.canvas.style.bottom = data['bottom'] };
	this.canvas.style.margin = data['width'];
	var conteneur = document.getElementById("simplyCanvas");
	conteneur.appendChild(this.canvas);
	this.ctx = this.canvas.getContext('2d');
	this.priority = (data['priority'] == null) ? 1 : data['priority'];
	this.canvas.style.zIndex = this.priority;
	this.loop = true;
	
	
	var recursive = function(item){
	if(item.children!= undefined && item.children != null){
		for(var i = 0; i < item.children.length; i++){
			var child = item.children[i];
			child.canvas = that.canvas;
			child.ctx = that.ctx;
			child.layer = that;
			if(child.children.length != 0){
				recursive(child);
			}
		}
	}
	};

	this.addItem = function(item){
		item.ctx = this.getCtx();
		item.canvas = this.getCanvas();
		item.layer = this;
		recursive(item);
		items.push(item);
		if(master != undefined){ // Si le canvas n'est pas ajouter au master. Par exemple pour être rafraichis manuellement.
			master.addItem(item);
		}
	};
	
	this.removeItem = function(item){
		for(var i = 0; i < items.length; i++){
			if(items[i].name == item.name){
				items.splice(i,1);
				break;
			}
		}
		master.removeItem(item);
	};
	
	this.getItems = function() {
		return items;
	};
	
	var update = function(){
		that.ctx.save();
		that.ctx.clearRect(0, 0, that.getCanvas().width, that.getCanvas().height);
		for(var i = 0; i < items.length; i++){
			if(items[i].isDie){
				that.removeItem(items[i]);
			} else if(items[i].isVisible){
				items[i].update();
			}
		} 
		that.ctx.restore();
		if(that.loop){
			window.requestAnimationFrame(update);
		}
		
	}
	
	this.stop = function(){
		that.items = null;
		that.loop = false;
		
	}
	
	
	this.update = function(){
		update();
	};
	
	this.getCtx = function(){	
		return this.ctx;
	};
	
	this.getCanvas = function(){	
		return this.canvas;
	};
	
	this.setMaster = function(newMaster){
		master = newMaster;
	};
	
	this.getMaster = function(){
		return master;
	};
	
};

Layer.prototype.preloadRessources = function(){
	var loader = new Loader(this.loader);
	loader.init(this.resources, this.canvas, this.ctx );
	loader.draw();
};

