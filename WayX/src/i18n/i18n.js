import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ca from "./ca";
import en from "./en";
import es from "./es";
import va from "./va";
import gl from "./gl";
import ar from "./ar";
import as from "./as";
import eu from "./eu";
import oc from "./oc";


/*
  This file is used to configure the i18n library. It is used to translate the app to different languages.
  The translations are stored in separate files, and the files are loaded in the order of the languages in the array.
 */


i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "en", // default language
  fallbackLng: "en", // fallback language in case key is not found for any translation
  resources: {
    // JSON file for various languages
    ca: ca, // Catalan
    en: en, // English
    es: es, // Spanish
    va: va, // Valencian
    gl: gl, // Galician
    ar: ar, // Aragonese
    as: as, // Asturian
    eu: eu, // Basque
    oc: oc, // Occitan / Aranese
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
