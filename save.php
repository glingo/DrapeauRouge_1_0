<?php
	header("Content-Type : text/plain");
	$nom = $_GET['nom'];
	$adresse = $_GET['adresse'];
	$score = $_GET['score'];
	//echo "nom :$_POST['nom'], adresse: $_POST['adresse'], score: $_POST['score']";	
	
	$host = "localhost";
	$user = 'jba';
	$password = 'jba';
	$bdd = 'jba';
	
	$connexion = mysql_connect($host, $user, $password) OR die('Erreur de connexion');
	mysql_select_db($bdd) OR die("sélection de la base impossible");
	$select = "SELECT count(*) FROM score WHERE mail LIKE '".$adresse."'";
	$res = 	mysql_query($select);
	$requete = "";
	if($res == 0 ){
		$requete = "INSERT INTO score(nom, mail, score1, score2, score3, total,  heure) VALUES('".$nom."', '".$adresse."', ".$score.", 0, 0, 0, ".time().")";
	} else {
		$requete = "UPDATE score SET nom = '".$nom."', adresse = '".$adresse."', score1 = ".$score.", heure =  ".time();
	}

	mysql_query($requete);
	mysql_close(); 



echo '<script type="text/javascript">window.location="index.html";
console.log("redirection");
</script>';

?>