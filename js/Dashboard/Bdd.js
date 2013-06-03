/*if(!window.indexedDB && window.mozIndexedDB) {
	window.indexedDB = mozIndexedDB;
	console.log("Moz indexedDB");
} else if (!window.indexedDB && window.webkitIndexedDB){
	window.indexedDB = webkitIndexedDB;
	window.IDBKeyRange = webkitIDBKeyRange;
	console.log("Webkit indexedDB");
	window.IDBTransaction = window.webkitIDBTransaction;
} else if(!window.indexedDB) {
	alert("Votre navigateur ne supporte pas IndexedDB");
}*/

if(window.mozIndexedDB){
	//console.log("yes");
	//console.log(window.mozIndexedDB);
} else {
	//console.log("no");
	//console.log(window.mozIndexedDB);
}