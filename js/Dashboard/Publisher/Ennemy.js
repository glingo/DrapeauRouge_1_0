function Ennemy(){
	this.subscribers = [];
}

Ennemy.prototype.deliver = function(item){
	
	this.subscribers.forEach(
		function(element, index, array){
			element.removeEnnemy(item);
		}
	);
	return this;
};