var LoaderInterface = new Interface('Loader', ['init', 'draw']);

/**
 * The loader interface.
 * Allows the use of pre-built loaders or usage of your own.
 * Loaders are used before the start of canvas, to load all necessary ressources.
 * To use it, instantiate a new loader with implementation in  parameter.
 */
function Loader(implementation){
	var loader;
	
	switch(implementation){
		case 'simpleLoader':
			loader = new SimpleLoader();
		break;
		case 'multiThreadLoader':
			loader = new MultiThreadLoader();
		break;
		default:
			try{
				loader = instantiate(implementation)
			} catch(e) {
				throw Error("Undefined implemantation name " + implementation);
			}
	}
	Interface.ensureImplements(loader, LoaderInterface);
	return loader;
	

}