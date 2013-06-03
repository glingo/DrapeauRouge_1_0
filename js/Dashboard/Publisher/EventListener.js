function EventListener(){
    this.subscribers = new Map("hashMap");
	this.subscribers.put('mouseMove', new Array());
	this.subscribers.put('mouseUp', new Array());
	this.subscribers.put('mouseDown', new Array());
	this.subscribers.put('mousePress', new Array());
	this.subscribers.put('dblClick', new Array());
	this.subscribers.put('keyDown', new Array());
	this.subscribers.put('keyUp', new Array());
	this.instance = null;
};

EventListener.getInstance = function(){
	if(this.instance == null){
		this.instance = new EventListener();
	}
	return this.instance;
};

EventListener.prototype.deliver = function(type, event){
	try {
		switch(type){
			case 'keyDown':
				this.subscribers.get('keyDown').forEach(
					function(element, index, array){
						element.keyDown(event);
					}
				);
			break;
			case 'keyUp':
				this.subscribers.get('keyUp').forEach(
					function(element, index, array){
						element.keyUp(event);
					}
				);
			break;
			case 'mousePress':
				this.subscribers.get('mousePress').forEach(
					function(element, index, array){
						element.mousePress(event);
					}
				);
			break;
			case 'mouseMove':
				this.subscribers.get('mouseMove').forEach(
					function(element, index, array){
						element.mouseMove(event);
					}
				);
			break;
			case 'mouseUp':
				this.subscribers.get('mouseUp').forEach(
					function(element, index, array){
						element.mouseUp(event);
					}
				);
			break;
			case 'dblClick':
				this.subscribers.get('dblClick').forEach(
					function(element, index, array){
						element.dblClick(event);
					}
				);
			break;
		}
	} catch(e){
		console.log(e);
	}
	
	return this;
};