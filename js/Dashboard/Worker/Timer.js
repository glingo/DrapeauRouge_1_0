function Timer(){
    this.time = 0;
    this.subscribers = [];
	this.interval;
}

Timer.prototype.update = function(){
    this.deliver(this.time);
    time++;
}

Timer.prototype.start = function(){
    this.interval = setInterval(this.update, 1000);
    return this;
}

Timer.prototype.stop = function(){
    clearInterval(this.interval);
    return this;
}

Timer.prototype.deliver = function(time){
    
	this.subscribers.forEach(
		function(element, index, array){
			element.time(time);
		}
	);
	return this;
};