import i18nKeyValues from "./i18n.js";
const i18nElements = document.querySelectorAll('[data-i18n]');
const defaultLanguage = "es";
const languageList = {
    "en": "English",
    "es": "español"
}

const getTextForElement = (key, lang) => {
    let text = i18nKeyValues[key][lang];
    if(text == undefined){
        console.warn(`'${key}' text key doesn't have a translation for '${lang}' language`);
    }
    return text == undefined ? i18nKeyValues[key][defaultLanguage] : text;
}

if(document.getElementById('en') !== null){
	const en = document.getElementById('en');
	en.onclick = () => changeLang('en');
}
if(document.getElementById('es') !== null){
	const es = document.getElementById('es');
	es.onclick = () => changeLang('es');
}		

const startLangSelector = () => {
	let browserLanguage = navigator.language.split("-")[0];
	if(localStorage.getItem("lang") !== null){
		browserLanguage = localStorage.getItem("lang");
	}else{
		if(!(browserLanguage in languageList)){
			browserLanguage = defaultLanguage;
		}
	}		
	for(let el of i18nElements){
			el.innerHTML = getTextForElement(el.getAttribute("data-i18n"), browserLanguage);
	}
}

const changeLang = (lang) => {
	localStorage.setItem("lang", lang);
    for(let el of i18nElements){
        el.innerHTML = getTextForElement(el.getAttribute("data-i18n"), lang);
    }
};

startLangSelector();
