function HashMap(keyType, valueType){
	var that = this;
	var values = new Object();
	var keySet= new Array();
	var entrySet= new Array();

	this.put = function (key, value){
		values[key] = value;
		keySet.push(key);
		entrySet.push(value);
	};

	this.putAll = function (data){
		for(var key in data){
			this.put(key, data[key]);
		}	
	};

	this.get = function (key){
		return values[key];
	};

	this.clear = function (){
		values.length = 0;
	};

	this.containsKey = function (key){
		for(var i =0; i < keySet.length; i++){
			if(key == keySet[i]){
				return true;
			}
		}
		return false;
	};

	this.containsValue = function (value){
		for(var i =0; i < entrySet.length; i++){
			if(value == entrySet[i]){
				return true;
			}
		}
		return false;
	};

	this.isEmpty = function (){
		if(values.length == 0){
			return true;
		} else {
			return false;
		}
	};

	this.remove = function (key){
		delete(values[key]);
		for(var i =0; i < keySet.length; i++){
			if(key == keySet[i]){
				keySet.splice(i,1);
			}
		};
		for(var i =0; i < entrySet.length; i++){
			if(values[key] == entrySet[i]){
				entrySet.splice(i,1);
			}
		};
	};

	this.size = function (){
		var size = 0;
		for( key in values){
			if(values.hasOwnProperty(key)){
				size++;
			}
		}
		return size;
	};

	this.keySet = function (){
		return keySet;
	};

	this.entrySet = function (){
		return entrySet;
	};
}