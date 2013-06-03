function CrashListener(){
	this.subscribers = new Array();
	this.instance = null;
}
CrashListener.getInstance = function(){
	if(this.instance == null){
		this.instance = new CrashListener();
	}
	return this.instance;
};

CrashListener.prototype.deliver = function(){
	for(var i = 0; i < this.subscribers.length; i++){
		this.subscribers[i].crash();
	}
};

CrashListener.prototype.toString = function(){
	console.log("Nombre d'écouteur " + this.subscribers.length);
}
