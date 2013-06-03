function Timer(){
    this.time = 0;
    this.subscribers = [];
	this.interval;
};

Timer.prototype.update = function(){
    this.deliver(this.time);
    this.time++;
}

Timer.prototype.start = function(){
	var that = this;
    this.interval = setInterval(function(){
		that.update();
	}, 1000);
    return this;
};

Timer.prototype.stop = function(){
    clearInterval(this.interval);
    return this;
};

Timer.prototype.deliver = function(time){
	this.subscribers.forEach(
		function(element, index, array){
			element.setTime(time);
		}
	);
	return this;
};