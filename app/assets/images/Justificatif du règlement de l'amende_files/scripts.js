function checkFormChoixPaiOuCon(){
	var result = false;
	var form = document.getElementById('fmChoixPaiOuCon');
	
	if (form.virement.value == "false" || (form.virement.value == "true" && form.cbvir[0].checked == true))
	{
		if(form.typecb[0].checked == false && form.typecb[1].checked == false && form.typecb[2].checked == false) 
		{
			if (locale == "fr")
			{
				window.alert('Veuillez sélectionner un type de carte bancaire');
			}
			else if (locale == "en")
			{
				window.alert('Please select a type of credit card');
			}
			else if (locale == "de")
			{
				window.alert('Bitte wählen Sie einen Bankkartentyp aus');
			}
			else if (locale == "it")
			{
				window.alert('Selezionare il tipo di carta di pagamento');
			}
			else if (locale == "nl")
			{
				window.alert('Wilt u het type bankkaart selecteren');
			}
			else if (locale == "es")
			{
				window.alert('Por favor seleccione un tipo de tarjeta de crédito');
			}
		}
		else
		{
			result = true;
			if (form.typecb[0].checked == true)
			{
				form.typeCB.value = "3"; 
			}
			else if (form.typecb[1].checked == true)
			{
				form.typeCB.value = "1";
			}
			else if (form.typecb[2].checked == true)
			{
				form.typeCB.value = "2";
			}
		}
	}
	else
	{
		result = true;
	}
	
	if (result == true)
	{
		// Amende non payable par virement
		if (form.virement.value == "false")
		{
			// Amende consignable
			if (form.consignable.value == "true")
			{
				// Choix paiement
				if ((form.paicon[0].checked == true)) 
				{
					form.typeAction.value="payer";
					form.typeRglt.value="cb";
					form.action="paiement.jsp";
				} 
				// Choix consignation
				else 
				{
					form.typeAction.value="consigner";
					form.typeRglt.value="cb";
					form.action="rappelConsignation.jsp";
				}
			}
			// Amende non consignable
			else
			{
				form.typeAction.value="payer";
				form.typeRglt.value="cb";
				form.action="paiement.jsp";
			}
		}
		// Amende payable par virement
		else
		{
			// Amende consignable
			if (form.consignable.value == "true")
			{
				// Choix paiement
				if ((form.paicon[0].checked == true)) 
				{
					// Choix virement
					if (form.cbvir[1].checked == true)
					{
						form.typeAction.value="payer";
						form.typeRglt.value="vir";
						if (form.typeContravention.value == 'AFM' || form.typeContravention.value == 'AFMm') {
							form.action="saisieInfoVirement.jsp";
						}else{
							form.action="infoVirement.jsp";
						}
						
					}
					// Choix CB
					else
					{
						form.typeAction.value="payer";
						form.typeRglt.value="cb";
						form.action="paiement.jsp";
					}
				} 
				// Choix consignation
				else 
				{
					// Choix virement
					if (form.cbvir[1].checked == true)
					{
						form.typeAction.value="consigner";
						form.typeRglt.value="vir";
						form.action="rappelConsignation.jsp";
					}
					// Choix CB
					else
					{
						form.typeAction.value="consigner";
						form.typeRglt.value="cb";
						form.action="rappelConsignation.jsp";
					}
				}
			}
			// Amende non consignable
			else
			{
				// Choix virement
				if (form.cbvir[1].checked == true)
				{
					form.typeAction.value="payer";
					form.typeRglt.value="vir";
					if (form.typeContravention.value == 'AFM' || form.typeContravention.value == 'AFMm') {
						form.action="saisieInfoVirement.jsp";
					}else{
						form.action="infoVirement.jsp";
					}
				}
				// Choix CB
				else
				{
					form.typeAction.value="payer";
					form.typeRglt.value="cb";
					form.action="paiement.jsp";
				}
			}
		}
	}
	return result; 
}

function checkFormRappelConsignation(){  
	var form = document.getElementById('rappelConsignation');
	if (form.typeRglt.value == "cb")
	{
		form.action="paiement.jsp";		      
	}
	else if (form.typeRglt.value == "vir")
	{
		if (form.typeContravention.value == 'AFM' || form.typeContravention.value == 'AFMm') {
			form.action="saisieInfoVirement.jsp";		 
		}else{
			form.action="infoVirement.jsp";		 
		}
			
		     
	}
	return true; 
}

function checkFormPaiementContravention(){
	var result = false;
	var form = document.getElementById('fmPaiementContravention'); 
	form.action="justifPaiement.jsp";
		
	if(form.cartenum.value == "") {
		if (locale == "fr"){
			window.alert('le champ "Numéro de carte bancaire" est obligatoire');
		}else if (locale == "en"){
			window.alert('You must enter the "card number"');
		}else if (locale == "de"){
			window.alert('Das Feld \u201EKartennummer\u201C muss ausgefüllt werden');
		}else if (locale == "it"){
			window.alert('Il campo "Numero di carta" è obbligatorio');
		}else if (locale == "nl"){
			window.alert('het veld "Kaartnummer" is verplicht');
		}else if (locale == "es"){
			window.alert('el campo "Número de tarjeta de crédito" es obligatorio');
		}
	} else if(form.moisvalid.value == "" || form.anneevalid.value == "") {
		if (locale == "fr"){
			window.alert('le champ "Date de validité" est obligatoire');
		}else if (locale == "en"){
			window.alert('You must enter the "expiry date"');
		}else if (locale == "de"){
			window.alert('Das Feld \u201EGültigkeitsdatum\u201C muss ausgefüllt werden');
		}else if (locale == "it"){
			window.alert('Il campo "Data di validità" è obbligatorio');
		}else if (locale == "nl"){
			window.alert('het veld "Geldigheidsdatum" is verplicht');
		}else if (locale == "es"){
			window.alert('el campo "Fecha de validez" es obligatorio');
		}
	} else if(form.cvv.value == "") {
		if (locale == "fr"){
			window.alert('le champ "Clé de cryptage" est obligatoire');
		}else if (locale == "en"){
			window.alert('You must enter the "security code"');
		}else if (locale == "de"){
			window.alert('Das Feld \u201EVerschlüsselungsschlüssel\u201C muss ausgefüllt werden');
		}else if (locale == "it"){
			window.alert('Il campo "Chiave di cifratura" è obbligatorio');
		}else if (locale == "nl"){
			window.alert('het veld "versleutelingssleutel" is verplicht');
		}else if (locale == "es"){
			window.alert('el campo "Código de encriptación" es obligatorio');
		}
	} else if(form.typeCB.value == "0") {
		if (locale == "fr"){
			window.alert('Vous n\'avez pas choisi le "Type de carte" utilisée');
		}else if (locale == "en"){
			window.alert('You have not selected the "type of card"');
		}else if (locale == "de"){
			window.alert('Sie haben nicht den verwendeten \u201EKartentyp\u201C gewählt');
		}else if (locale == "it"){
			window.alert('Il "tipo di carta" non è stato impostato');
		}else if (locale == "nl"){
			window.alert('U heeft het gebruikte "Kaarttype" niet gekozen');
		}else if (locale == "es"){
			window.alert('No ha seleccionado el "Tipo de tarjeta" utilizada');
		}
	} else if(form.cartenum.value.length != 16 || !IsNumeric(form.cartenum.value)) {
		if (locale == "fr"){
			window.alert('le champ "Numéro de carte bancaire" doit avoir 16 chiffres');
		}else if (locale == "en"){
			window.alert('The "card number" must have 16 digits');
		}else if (locale == "de"){
			window.alert('Das Feld \u201ENummer der Karte\u201C muss 16 Ziffern enthalten');
		}else if (locale == "it"){
			window.alert('Il campo "Numero di carta" deve contenere 16 cifre');
		}else if (locale == "nl"){
			window.alert('het veld "Kaartnummer" moet uit 16 cijfers bestaan');
		}else if (locale == "es"){
			window.alert('el campo "Número de tarjeta de crédito" debe tener 16 cifras');
		}
	} else if(form.moisvalid.value.length != 2 || form.anneevalid.value.length != 2 || !IsMois(form.moisvalid.value) || !IsNumeric(form.anneevalid.value)) {
		if (locale == "fr"){
			window.alert('La date de validité n\'est pas valide');
		}else if (locale == "en"){
			window.alert('The date of validity is not valid');
		}else if (locale == "de"){
			window.alert('Das Gültigkeitsdatum ist nicht gültig');
		}else if (locale == "it"){
			window.alert('La data di validità non è valida');
		}else if (locale == "nl"){
			window.alert('De geldigheidsdatum is ongeldig');
		}else if (locale == "es"){
			window.alert('La fecha de validez es incorrecta');
		}
	} else if (!IsDateValide(form.moisvalid.value, form.anneevalid.value)){
		if (locale == "fr"){
			window.alert('La date de validité n\'est pas valide');
		}else if (locale == "en"){
			window.alert('The expiry date is not valid');
		}else if (locale == "de"){
			window.alert('Das Gültigkeitsdatum ist nicht gültig');
		}else if (locale == "it"){
			window.alert('La data di scadenza non è valida');
		}else if (locale == "nl"){
			window.alert('De geldigheidsdatum is ongeldig');
		}else if (locale == "es"){
			window.alert('La fecha de validez es incorrecta');
		}
	} else if(form.cvv.value.length != 3 || !IsNumeric(form.cvv.value)) {
		if (locale == "fr"){
			window.alert('le champ "Clé de cryptage" doit avoir 3 chiffres');
		}else if (locale == "en"){
			window.alert('The "security code" must have 3 digits');
		}else if (locale == "de"){
			window.alert('Das Feld \u201EVerschlüsselungsschlüssel\u201C muss 3 Ziffern enthalten');
		}else if (locale == "it"){
			window.alert('Il campo "Chiave di cifratura" deve contenere 3 cifre');
		}else if (locale == "nl"){
			window.alert('het veld "versleutelingssleutel" moet uit 3 cijfers bestaan');
		}else if (locale == "es"){
			window.alert('el campo "Código de encriptación" debe tener 3 cifras');
		}
	} else {
		result = true; 
	}
	return result;
}
			          

function sendMail() {
	var form = document.getElementById('fmJustifmail');
	abreuniversal('popupJustifmail.jsp?email='+form.email.value, '765','250');	
	form.reset();
}

function checkMail() {
	result = false;
	var form = document.getElementById('fmJustifmail');
	var myEMailIsValid = true;
	var checkThisEmail = form.email.value;
	var myAtSymbolAt = checkThisEmail.indexOf('@');
	var myLastDotAt = checkThisEmail.lastIndexOf('.');
	var mySpaceAt = checkThisEmail.indexOf(' ');
	var myLength = checkThisEmail.length;

	if (myAtSymbolAt < 1 ) {myEMailIsValid = false}
	if (myLastDotAt < myAtSymbolAt) {myEMailIsValid = false}
	if (myLength - myLastDotAt <= 2) {myEMailIsValid = false}
	if (mySpaceAt != -1) {myEMailIsValid = false}
	if (myEMailIsValid == true){}
	else {
		if (locale == "fr"){
			window.alert('Votre mail n\'est pas valide')
		}else if (locale == "en"){
			window.alert('Your e-mail address is not valid');
		}else if (locale == "de"){
			window.alert('Ihre E-Mail-Adresse ist ungültig');
		}else if (locale == "it"){
			window.alert('Indirizzo e-mail non valido');
		}else if (locale == "nl"){
			window.alert('Uw e-mailadres is ongeldig');
		}else if (locale == "es"){
			window.alert('Su correo electrónico es incorrecta');
		}
	}
	return myEMailIsValid
}

ns4 = (document.layers)? true:false;
ie4 = (document.all)? true:false;
ie5 = false;
if ((ie4) && (navigator.userAgent.indexOf('MSIE 5')>0)) ie5 = true;

if (!ns4 && !ie4) ie4=true;

//affiche l'objet 'obj'
function afficher(obj) {
	if (obj == 0) return;
	if (ns4) 	obj.display = "inline";
	else if (ie4) 	obj.display = "inline";
}

// cache l'objet 'obj'
function cacher(obj) {
	if (obj == 0) return;	
	if (ns4) 	obj.display = "none";
	else if (ie4) 	obj.display = "none";
}

// fonction retournant l'objet dont l'identifiant est pass? en param?tre
function queldiv(obj_name) {
	
	if (ns4)
		return eval("document." + obj_name);
	else
		if (ie4)
			return document.getElementById(obj_name).style;//eval(obj_name + ".style");
		else
			return 0;
}

function verifiSaisie() {
	var form = document.getElementById('fmSaisieNumAmende');
	if ( form.saisie1.value.length == 3){
 		if ((form .saisie1.value.charAt(0) == form .saisie1.value.charAt(1)) &&
			 (form .saisie1.value.charAt(1) == form .saisie1.value.charAt(2)))
		{
			cacher(queldiv('AMD'));
			cacher(queldiv('AMDok'));
			afficher(queldiv('AutreAMD'));
			afficher(queldiv('AutreAMDok'));
		}else{
			cacher(queldiv('AutreAMD'));
			cacher(queldiv('AutreAMDok'));
			afficher(queldiv('AMD'));
			afficher(queldiv('AMDok'));
		}
		form.AMD_saisie2.value="";
		form.AMD_saisie3.value="";
		form.AMD_saisie4.value="";
		form.AMD_saisie5.value="";
		form.AutreAMD_saisie2.value="";
		form.AutreAMD_saisie3.value="";
		form.AutreAMD_saisie4.value="";
	}else if ( form.saisie1.value.length == 4){
 		// On prépare le changement de case
 		if ((form .saisie1.value.charAt(0) == form .saisie1.value.charAt(1)) &&
			 (form .saisie1.value.charAt(1) == form .saisie1.value.charAt(2)))
		{
			// Ici on a une amende à 14 chiffres
 			form .AutreAMD_saisie2.focus();
		}else{
			// Ici on a une amende à 18 chiffres
			form .AMD_saisie2.focus();
		}
	}
 	return true;
}

var alwaysSubmited = false;
            
function checkFormSaisieContravention(){
	var form = document.getElementById('fmSaisieNumAmende');
	
	// on remplie la variable numavis (concatenation)
	form.numavis.value = form.numavis.value+form.saisie1.value;

	if (form.saisie1.value.charAt(0) == form.saisie1.value.charAt(1) && 
		form.saisie1.value.charAt(1) == form.saisie1.value.charAt(2))
	{
//			window.alert("form.AutreAMD_saisie2.value "+form.AutreAMD_saisie2.value);
		form.numavis.value = form.numavis.value+form.AutreAMD_saisie2.value;
		form.numavis.value = form.numavis.value+form.AutreAMD_saisie3.value;
		form.numavis.value = form.numavis.value+form.AutreAMD_saisie4.value;
	}else {
//		window.alert("form.AMD_saisie2.value "+form.AMD_saisie2.value);
		form.numavis.value = form.numavis.value+form.AMD_saisie2.value;
		form.numavis.value = form.numavis.value+form.AMD_saisie3.value;
		form.numavis.value = form.numavis.value+form.AMD_saisie4.value;
		form.numavis.value = form.numavis.value+form.AMD_saisie5.value;
	}

	if(form.numavis.value == "" || !IsNumeric(form.numavis.value) || !IsNumeric(form.cle.value))
	{
		if (locale == "fr"){
			window.alert('Ce numéro de télépaiement n\'est pas valide');
		}else if (locale == "en"){
			window.alert('This is not a valid e-payment number');
		}else if (locale == "de"){
			window.alert('Diese anzahl von elektronischen Zahlungssystemen ist nicht gültig');
		}else if (locale == "it"){
			window.alert('Il numero di telepagamento non è valido.');
		}else if (locale == "nl"){
			window.alert('Dit aantal elektronische betalingen is niet geldig');
		}else if (locale == "es"){
			window.alert('El número de telepago es incorrecto');
		}
		
		form.numavis.value = "";
		form.saisie1.value = "";
		form.AMD_saisie2.value = "";
		form.AMD_saisie3.value = "";
		form.AMD_saisie4.value = "";
		form.AMD_saisie5.value = "";
		
		form.AutreAMD_saisie2.value = "";
		form.AutreAMD_saisie3.value = "";
		form.AutreAMD_saisie4.value = "";
		
		form.cle.value = "";
		return false;
	}
	
	//Gestion PB Cle DPS	
	if ((form.numavis.value.length != 14 && form.numavis.value.length != 18) || (form.cle.value.length != 2 && form.cle.value.length != 0))
	{
		if (locale == "fr"){
			window.alert('Ce numéro de télépaiement ou sa clé n\'est pas valide');
		}else if (locale == "en"){
			window.alert('This is not a valid e-payment number or key');
		}else if (locale == "de"){
			window.alert('Diese anzahl von elektronischen Zahlungssystemen oder der entsprechende Schlüssel ist nicht gültig');
		}else if (locale == "it"){
			window.alert('Il numero di telepagamento o la sua chiave non sono validi.');
		}else if (locale == "nl"){
			window.alert('Dit aantal elektronische betalingen of de sleutel is niet geldig');
		}else if (locale == "es"){
			window.alert('El número de telepago o su código es incorrecto');
		}
		form.numavis.value = "";
		form.saisie1.value = "";
		form.AMD_saisie2.value = "";
		form.AMD_saisie3.value = "";
		form.AMD_saisie4.value = "";
		form.AMD_saisie5.value = "";
		
		form.AutreAMD_saisie2.value = "";
		form.AutreAMD_saisie3.value = "";
		form.AutreAMD_saisie4.value = "";
		
		form.cle.value = "";
		return false;
	}else{
		result = true; 
	}
	return result;
}

function resetForm(){
	var form = document.getElementById('fmSaisieNumAmende');
	if (form.fromSiteAutorise.value == "false")
	{
		form.numavis.value = "";
		form.saisie1.value = "";
		form.AMD_saisie2.value = "";
		form.AMD_saisie3.value = "";
		form.AMD_saisie4.value = "";
		form.AMD_saisie5.value = "";
			
		form.AutreAMD_saisie2.value = "";
		form.AutreAMD_saisie3.value = "";
		form.AutreAMD_saisie4.value = "";
		
		form.cle.value = "";
	}
}

       
function changeFocus(element){
	var form = document.getElementById('fmSaisieNumAmende');
	if ( element == 'AMD_saisie3' ){
		if (form.AMD_saisie2.value.length == 4){
			form.AMD_saisie3.focus();
		}
	} else if ( element == 'AMD_saisie4' ){
		if (form.AMD_saisie3.value.length == 4){
			form.AMD_saisie4.focus();
		}
	} else if ( element == 'AMD_saisie5' ){
		if (form.AMD_saisie4.value.length == 4)	{
			form.AMD_saisie5.focus();
		}
	} else if ( element == 'AutreAMD_saisie3' ){
		if (form.AutreAMD_saisie2.value.length == 4){
			form.AutreAMD_saisie3.focus();
		}
	} else if ( element == 'AutreAMD_saisie4' ){
		if (form.AutreAMD_saisie3.value.length == 4){
			form.AutreAMD_saisie4.focus();
		}
	} else if ( element == 'cle' ){
		if (form.AutreAMD_saisie4.value.length == 2 || form.AMD_saisie5.value.length == 2){
			form.cle.focus();
		}
	}
}


function changecursorin(element)
{
	$("#"+element).css('cursor','pointer');
}

function changecursorout(element)
{
	$("#"+element).css('cursor','crosshair');
}