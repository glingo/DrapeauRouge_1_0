var PublisherInterface = new Interface('Publisher', ['deliver']);

/**
 * Le pattern est un chemin.
 */
function Publisher(implementation){
	var publisher;
	
	switch(implementation){
		case 'ennemy':
			publisher = new Ennemy();
		break;
		case 'timer':
			publisher = new Timer();
		break;
		default:
			try{
				publisher = instantiate(implementation)
			} catch(e) {
				throw Error("Undefined implemantation name " + implementation);
			}
	}
	Interface.ensureImplements(publisher, PublisherInterface);
	return publisher;
	

}