function AABBCollision(){
}

AABBCollision.prototype.touch = function(item1, item2){
		if(item2.x >= item1.x + item1.width){//console.log(" on the right side");
			return false;
		}
		else if(item2.x + item2.width <= item1.x){//console.log("On the left side");
			return false;
		}
		else if( item2.y >= item1.y + item1.height){//console.log("on the bottom");
			return false;
		}
		else if( item2.y + item2.height <= item1.y){ //console.log("on the bottom");
			return false;
		} else{
			this.item1 = item1;
			this.item2 = item2;
			return true;
		}
};