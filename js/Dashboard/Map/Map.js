var MapInterface = new Interface('Map', ['put', 'putAll', 'get', 'clear', 'containsKey', 'containsValue', 'isEmpty', 'remove', 'size', 'keySet', 'entrySet'])

/**
 * Le pattern est un chemin.
 */
function Map(implementation){
	var map;
	
	switch(implementation){
		case 'hashMap':
			map = new HashMap();
		break;
		default:
			try{
				map = instantiate(implementation)
			} catch(e) {
				throw Error("Undefined implemantation name " + implementation);
			}
	}
	Interface.ensureImplements(map, MapInterface);
	return map;
}