// var all_messages = $(".hs-msg__body").text()

var regex_matching = [
  // emails
  // /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  // credit cards
  /\b(?:\d[ -]*?){4,16}\b/,
  // Austria ZMR-Zahl National identification number - Zentrales Melderegister (Central Register of Residents - CRR)
  /[0-9]{12}/,
  // Austria ASVG
  /[0-9]{10}/,
  // Austria ssPIN
  /[A-Za-z0-9+/]{22}[A-Za-z0-9+/=][A-Za-z0-9+/=]/,
  // Belgium BE.ID
  /[0-9]{2}\.?[0-9]{2}\.?[0-9]{2}-[0-9]{3}\.?[0-9]{2}/,
  // Belgium EGN
  /[0-9]{2}[0,1,2,4][0-9][0-9]{2}[0-9]{4}/,
  // Czech, Slovakia RČ Birth Number (Rodné číslo)
  /[0-9]{2}[0,1,5][0-9][0-9]{2}\/?[0-9]{4}/,
  // Czech, Slovakia ČOP Citizen's Identification Card Number (Číslo občianskeho preukazu)
  /[A-Z]{2}[0-9]{6}/,
  // Denmark CPR CPR-nummer (personnummer)
  /[0-9]{2}[0,1][0-9][0-9]{2}-[0-9]{4}/,
  // Estonia IK Isikukood (personal code)
  /[1-6][0-9]{2}[1,2][0-9][0-9]{2}[0-9]{4}/,
  // Europe IBAN 	ISO 13616 with ISO 3166 country code prefix in compact format
  /[A-Z]{2}?[ ]?[0-9]{2}[]?[0-9]{4}[ ]?[0-9]{4}[ ]?[0-9]{4}[ ]?[0-9]{4}[ ]?[0-9]{4}/,
  // Finland HETU Personal identity code (henkilötunnus)
  /[0-9]{2}\.?[0,1][0-9]\.?[0-9]{2}[-+A][0-9]{3}[A-Z]/,
  // France NIR Social security number (INSEE)
  /[1,2][ ]?[0-9]{2}[]?[0,1,2,3,5][0-9][ ]?[0-9A-Z]{5}[ ]?[0-9]{3}[ ]?[0-9]{2}/,
  // Germany PK Personenkennziffer (Bundeswehr)
  /[0-9]{2}[0,1][0-9][0-9]{2}-[A-Z]-[0-9]{5}/,
  // Germany Steuer-ID Steuer-Identifikationsnummer
  /[0-9]{3}\/?[0-9]{4}\/?[0-9]{4}/,
  // Germany VSNR, RVNR Versicherungsnummer, Rentenversicherungsnummer
  /[0-9]{2}[0-9]{2}[0,1][0-9][0-9]{2}[A-Z][0-9]{2}[0-9]/,
  // Greece Tautotita Tautotita
  /[A-Z][ -]?[0-9]{6}/,
  // Hungary TAJ Social insurance number (TAJ szám)
  /[0-9]{3}[ ]?[0-9]{3}[ ][0-9]{3}/,
  // Hungary Szam Personal identfication number (Személyi szám)
  /[1-8][ ]?[0-9]{2}[0,1][0-9][0-9]{2}[ ]?[0-9]{4}/,
  // Ireland PPS Personal Public Service Number
  /[0-9]{7}[A-Z]W?/,
  // Italy CF Codice fiscale
  /[A-Z]{6}[0-9]{2}[A-E,H,L,M,P,R-T][0-9]{2}[A-Z0-9]{5}/,
  // Latvia PK Personal no (Personas kodas)
  /[0-9]{2}[0,1][0-9][0-9]-[0-9]{5}/,
  // Lithuania AK Personal code (Asmens kodas)
  /[3-6][0-9]{2}[0,1][0-9][0-9]{2}[0-9]{4}/,
  // Netherlands BSN Burgerservicenummer, sofinummer (Citizen's Service Number)
  /[0-9]{9}/,
  // Norway FN Fødselsnummer
  /[0-9]{2}[0,1][0-9][0-9]{2}[ ]?[0-9]{5}/,
  // Poland PESEL National identification number
  /[0-9]{4}[0-3]{1}[0-9}{1}[0-9]{5}/,
  // Romania CNF Nr personal
  /[1-8][0-9]{2}[0,1][0-9][0-9]{2}[0-9]{6}/,
  // Spain DNI Documento Nacional de Identidad
  /[0-9,X,M,L,K,Y][0-9]{7}[A-Z]/,
  // Sweden Personnr Personal id number
  /[0-9]{2}[0-1][0-9][0-9]{2}[-+][0-9]{4}/,
  // Switzerland AVS Old AVS format with personal data encoded
  /[0-9]{3}\.?[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}/,
  // Switzerland AVS 2008 New AVS format (16 digits with constant prefix 756, which is ISO 3166-1 country code)
  /756\.?[0-9]{4}\.?[0-9]{4}\.?[0-9]{2}/,
  // UK NI National identification number
  /[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-DFM]?/,
  // UK NINO National insurance number
  /^([ACEHJLMOPRSW-Yacehjlmoprsw-y][A-CEGHJ-NPRSTW-Za-ceghj-nprstw-z]|[Bb][A-CEHJ-NPRSTW-Za-cehj-nprstw-z]|[Gg][ACEGHJ-NPRSTW-Zaceghj-nprstw-z]|[Kk][A-CEGHJ-MPRSTW-Za-ceghj-mprstw-z]|[Nn][A-CEGHJLMNPRSW-Za-ceghjlmnprsw-z]|[Tt][A-CEGHJ-MPRSTW-Za-ceghj-mprstw-z]|[Zz][A-CEGHJ-NPRSTW-Ya-ceghj-nprstw-y])[0-9]{6}[A-Da-d ]?$/,
  // UK NHS UK NHS Number
  /[0-9]{3}[ -]?[0-9]{3}[-]?[0-9]{4}/,
  // US SSN Social Security Number
  /\b(?!000|666|9\d{2})([0-8]\d{2}|7([0-6]\d))([-]?|\s{1})(?!00)\d\d\2(?!0000)\d{4}\b/,
  // phone number
  // /(\d?[^\s\w]*(?:\(?\d{3}\)?\W*)?\d{3}\W*\d{4})/gim,

  // internatioal passport
  /^[A-Z0-9<]{9}[0-9]{1}[A-Z]{3}[0-9]{7}[A-Z]{1}[0-9]{7}[A-Z0-9<]{14}[0-9]{2}$/,

  // English passwords
  /\b(\w*(p(as(s)?)?\s?w(ord)?|pas)\w*)\b/ig,

  // Spanish passwords
  /\b(\w*(contr(a)?\s?sen(a)?|contra)\w*)\b/ig,

  // Portuguese passwords
  /\b(\w*(senh(a)?)\w*)\b/ig,

  // French passwords
  /\b(\w*(mo(t)?\s?d(e)?\s?p(as(s)?(e)?)?|passe|mdp)\w*)\b/ig,

  // Serbian/Bosnian/Croatian/Montenegrian passwords
  /\b(\w*(sifr(a)?)\w*)\b/ig

  // English addresses
  // /\d{1,4} [\w\s]{1,20}(?:(street|avenue|road|highway|square|trail|drive|court|parkway|boulevard|circle)\b|(st|ave|rd|hwy|sq|trl|dr|ct|pkwy|blvd|cir)\.(?=\b)?)/gim
];

// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {

      // template
      // $(".hs-msg__body").markRegExp(//);

      for (index in regex_matching) {
        $(".hs-msg__body").markRegExp(regex_matching[index]);
      }






    }
  }
);

//$(".hs-msg__body").markRegExp(/^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/);
