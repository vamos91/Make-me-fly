function autocomplete() {
	for(var i = 0, l = document.getElementsByTagName('input').length; i < l; i++) {
		if(document.getElementsByTagName('input').item(i).type == 'text') {
			document.getElementsByTagName('input').item(i).setAttribute('autocomplete', 'off');
		}
	}
}

function abreuniversal(filen,w,h) {
	var wostring = "\'toolbar=no,location=no,scrollbars=no,resizable=yes,width=" + w + ",height=" + h + "\'";
	window.open(filen, '', wostring);	
}

function popupFaq(page,w,h) {
	var wostring = "\'toolbar=no,location=no,scrollbars=yes,resizable=yes,width=" + w + ",height=" + h + "\'";
	faq = window.open(page, 'faq', wostring);
	faq.focus();	
}

function popupAvisaco(w,h) {
	var wostring = "\'toolbar=no,location=no,scrollbars=yes,resizable=yes,width=" + w + ",height=" + h + "\'";
	faq = window.open("/portail/paiement/popupAvisaco.jsp", 'avisaco', wostring);
	faq.focus();	
}

function popupSecurite(w,h) {
	var wostring = "\'toolbar=no,location=no,scrollbars=yes,resizable=yes,width=" + w + ",height=" + h + "\'";
	securite = window.open("/portail/paiement/securite.jsp", 'securite', wostring);
	securite.focus();		
}

function popupGlossaire(link, w,h) {
	var wostring = "\'toolbar=no,location=no,scrollbars=yes,resizable=yes,width=" + w + ",height=" + h + "\'";
	glossaire = window.open(link, 'glossaire', wostring);
	glossaire.focus();	
}

function do_totals1() {
	document.getElementById('pleasewaitScreen').style.visibility="visible";
}		

function actionOnClickOk() {
	var formId = document.getElementsByTagName('form').item(0).id;
	if (formId == "fmSaisieNumAmende"){
		if(checkFormSaisieContravention()){
			alwaysSubmited = true;                 
		}else{
			alwaysSubmited = false;
		}               
	}else if (formId == "fmChoixPaiOuCon"){
		if(checkFormChoixPaiOuCon()){
			alwaysSubmited = true;                 
		}else{
			alwaysSubmited = false;
		}               
	}else if (formId == "fmPaiementContravention"){
		if(checkFormPaiementContravention()){
			alwaysSubmited = true;
			do_totals1();   
		}else{
			alwaysSubmited = false;
		}               
	}else if (formId == "rappelConsignation"){
		if(checkFormRappelConsignation()){
			alwaysSubmited = true;
		}else{
			alwaysSubmited = false;
		}  
	}
	return alwaysSubmited;
}

function IsNumeric(sText) {
	var ValidChars = "0123456789";
   	var IsNumber=true;
	var Char;
	for (i = 0; i < sText.length && IsNumber == true; i++) { 
		Char = sText.charAt(i); 
	  	if (ValidChars.indexOf(Char) == -1) {
			IsNumber = false;
		}
	}
	return IsNumber;
}

function IsDateValide(sMois, sAnnee) {
	var isValide = true;
	var la_date = new Date();
	var mois = la_date.getMonth()+1; // +1 car janvier = 0
	var annee = la_date.getYear();
	
	if (mois < 10){
		mois = '0'+mois;
	}
	var date = annee+mois;
	var dateSaisie = '20'+sAnnee+sMois;
	
	if (dateSaisie < date) {
		isValide = false;
	}
	
	return isValide;
}
			
function IsMois(sText){				
	var IsDate=/0[1-9]/.test(sText) || /1[0-2]/.test(sText);
	return IsDate;
}

function MM_swapImgRestore() { //v3.0
	var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.0
	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function saveStep(currentStep) {
	document.cookie="step="+escape(currentStep)+":";
}

function resetCookie() {
	document.cookie="step="+escape("0")+":";	
}

function getStep(currentStep) {
	var step="";
	var monCookie = document.cookie;
	var place = monCookie.indexOf("step=");
	var fin = monCookie.indexOf(":");
	if (place != -1) {
		var debut = place+5;
		var step = monCookie.substring(debut,fin);
		step = unescape(step);
	} else {
		step = currentStep;
	}
	return step;
}

function testBack(currentStep) {
	var step = getStep(currentStep);
	if(step <= currentStep) {
		saveStep(currentStep);
	} else {
		if (locale == "fr"){
			window.alert('Veuillez ne pas utiliser le bouton "Précédent"');
		}else if (locale == "en"){
			window.alert('Please do not use the "back" arrow icon');
		}else if (locale == "de"){
			window.alert('Bitte nicht auf \u201EZurück\u201C klicken');
		}else if (locale == "it"){
			window.alert('Si prega di non utilizzare il tasto "Indietro"');
		}else if (locale == "nl"){
			window.alert('U kunt de knop "Vorige" niet gebruiken');
		}else if (locale == "es"){
			window.alert('Por favor no utilice el botón "Anterior"');
		}
		resetCookie();
		window.location.replace("/portail/paiement/saisienum.jsp");
	}	
}

