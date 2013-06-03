var AnimationInterface = new Interface('Animation', ['draw', 'stop']);

/**
 * Le pattern est un chemin.
 */
function Animation(implementation, src, x, y, width, height, vx){
	var animation;
	
	switch(implementation){
		case 'spriteAnimation':
			animation = new SpriteAnimation(src, x, y, width, height);
		break;
		case 'scrollAnimation':
			animation = new ScrollAnimation(src, x, y, width, height, vx);
		break;
		default:
			try{
				animation = instantiate(implementation, src, x, y, width, height, vx)
			} catch(e) {
				throw Error("Undefined implemantation name " + implementation);
			}
	}
	Interface.ensureImplements(animation, AnimationInterface);
	return animation;
	

}