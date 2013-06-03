var CollisionInterface = new Interface('Collision', ['touch'])

function Collision(implementatation){
	var collision;
	switch(implementatation){
		case 'AABBCollision':
			collision = new AABBCollision();
		break;
		default:
			try{
				path = instantiate(implementation)
			} catch(e) {
				throw Error("Undefined implemantation name " + implementation);
			}
	}
	Interface.ensureImplements(collision, CollisionInterface);
	return collision;
}
