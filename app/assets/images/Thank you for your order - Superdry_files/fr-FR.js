var

//General
terms_url='/conditions-generales',
privacy_url='/politique-de-confidentialite',
lang_register='/my-account/register',
lang_forgot_password='/forgotten-password',
lang_theme_close_link='Fermer',
lang_theme_cancel_link='Annuler',
lang_theme_proceed_link='Continuer',
lang_theme_confirm_link='Confirmer',
lang_theme_newsletter_thanks = '<h3>Merci pour votre inscription!</h3><p>Vous faites désormais partie du tirage au sort permettant de gagner 600 € en bons d\'achat Superdry chaque mois !<BR />Si vous gagnez, nous vous informerons par e-mail.</p>',
lang_theme_please_email='Indiquez une adresse e-mail valable.',
lang_theme_please_newsletter='Choisissez au moins un bulletin d\'information auquel vous abonner.',
//lang_theme_newsletter_terms='<p>Pour continuer, cochez la case pour confirmer que vous avez lu nos conditions générales, vous acceptez que nous utilisions les informations que vous nous fournissez selon les conditions de notre <a href="'+privacy_url+'" target="_blank">politique de confidentialité</a> et vous acceptez d\'utiliser notre site conformément aux <a href="'+terms_url+'" target="_blank">conditions générales</a> de ce site Web.</p>',
lang_theme_notreg_terms='Vous devez lire et accepter nos conditions générales',
lang_theme_giftcard_invalid='N/A',
lang_theme_thank_you='TODO',
lang_theme_register_confirm='TODO',

//auto search
locayta_autosearch_products='articles',
locayta_keywords='mots clés',
locayta_mens='Homme',
locayta_womens='Femme',
locayta_mens_products='articles homme',
locayta_womens_products='articles femme',
locayta_autosearch_mens_categories='catégories homme',
locayta_autosearch_womens_categories='catégories femme',
locayta_autosearch_categories='catégories',
locayta_all_mens='voir tous les résultats homme',
locayta_all_womens='voir tous les résultats femme',
locayta_all='voir tous les résultats',

//Category page
locayta_clear_all_filters='effacer tous les filtres',
locayta_clear_all='Tout effacer',
locayta_clear='effacer',
locayta_filter='filtrer',

//Product page
lang_theme_add_wish_title='ajouter à votre liste',
lang_theme_remove_wish_title='supprimer de votre liste',
lang_theme_low_stock='Malheureusement, nous ne disposons pas de la quantité demandée en stock.',
lang_theme_select_size="Choisissez une taille avant d'ajouter au panier.",
lang_theme_giftcard_value='N/A',
lang_theme_giftcard_colour='N/A',
lang_theme_wishlist_select_size="Choisissez une taille avant d'ajouter l'article à votre liste enregistrée.",
lang_theme_wishlist_added='Cet article a été ajouté à votre liste enregistrée.',
lang_theme_wishlist_removed='Cet article a été supprimé de votre liste enregistrée.',

//Registration
lang_theme_invalid_password='Mot de passe incorrect',
lang_theme_password_number='Votre mot de passe doit être composé de caractères alphabétiques et numériques.',
lang_theme_email_nomatch='L\'adresse e-mail spécifiée ne correspond pas',
lang_theme_password_nomatch='Le mot de passe spécifié ne correspond pas',
lang_theme_password_length='Votre mot de passe doit compter entre 8 et 20 caractères',
lang_theme_details_check='Vérifiez les détails de votre adresse',
lang_theme_invalid_postcode='Code postal incorrect',
lang_theme_invalid_email='Adresse e-mail incorrecte',
lang_theme_invalid_phone='Numéro de téléphone incorrect',
lang_theme_billing_details='Vérifiez vos coordonnées de facturation',
lang_theme_shipping_details='Vérifiez vos coordonnées de livraison',
lang_theme_payment_details='Vérifiez les détails de votre paiement ',
lang_theme_email_registered='Adresse e-mail déjà enregistrée<br/><a href="my-account">Connectez-vous</a>',
lang_theme_address_label_exists='Cette adresse de livraison est déjà enregistrée sur notre système.',
lang_theme_gender_missing='Vous devez sélectionner votre sexe.',

//Shopping bag
// lang_theme_coupon_invalid='Code promotionnel introuvable. Veuillez réessayer.',
// lang_theme_coupon_ineligible='Code promotionnel introuvable. Veuillez réessayer.',
lang_theme_coupon_login='Pour utiliser ce code promotionnel, accédez à <a href="/my-account">connexion</a> ou <a href="/my-account/register">inscription</a>',
lang_theme_coupon_time='Malheureusement, votre compte n\'a pas été créé dans la période requise pour utiliser ce code promotionnel.',
lang_theme_coupon_first='Malheureusement, vous ne pouvez utiliser ce code promotionnel qu\'avec votre première commande.',
lang_theme_paypal_terms='<p>En utilisant ce code d\'offre, vous acceptez de vous abonner au bulletin d\'information homme et femme de superdry. </p><p>Pour continuer, cochez la case confirmant que vous avez lu nos conditions générales et que vous acceptez que nous utilisions les informations fournies selon les termes de notre <a href="'+privacy_url+'" target="_blank">politique de confidentialité</a> et d\'utiliser notre site conformément aux <a href="'+terms_url+'" target="_blank">conditions générales</a> de ce site web</p>',

//Checkout
lang_theme_processing='traitement en cours',
lang_phone_needed="Merci d'indiquer votre numéro de téléphone pour faciliter la tâche du livreur lors du dépôt de votre colis.",
lang_klarna_mismatch='Attention : l\'adresse de livraison doit correspondre à l\'adresse de facturation pour ce type de paiement',
lang_insufficient_stock='Veuillez nous excuser, certains des articles que vous avez commandé ne sont plus en stock, merci de vérifier votre panier avant de poursuivre vos achats.',
lang_empty_bag='Veuillez nous excuser, les articles que vous avez commandé ne sont plus en stock, cliquez sur « OK » afin de revenir à la page d\'accueil.',
lang_theme_ok="Ok",

//Captcha
lang_nocaptcha='Veuillez saisir le CAPTCHA.',

//Click&Collect
lang_miles='N/A';

var SG = {};

SG.Lang = {
	ShoppingBag: {
		"colour": "Couleur",
		"size": "Taille",
		"itemCode": "Code de l'article",
		"remove": "Supprimer",
		"gcNotice": "N/A"
	},
	Checkout: {
		"termsPopupStaffDiscount": "Cochez la case pour confirmer que les achats ont été effectués conformément aux conditions générales des achats du personnel.",
		"giftCardUnavailableRegion": "N/A",
		"klarnaPopup": 'Veuillez confirmer votre adresse pour ce type de paiement',
		"klarnaStreet": 'Rue',
		"klarnaHouse": 'Numéro de maison'
	},
	General: {
		"termsPopup": 'Veuillez cocher la case pour accepter nos <a href="conditions-generales" target="_blank">conditions générales</a>'
	}
};
