import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import HeaderEN from './locales/en/home-page/Header-EN.json';
import HeaderVI from './locales/vi/home-page/Header-VI.json';
import HomeMainVI from "./locales/vi/home-page/Main-VI.json";
import HomeMainEN from './locales/en/home-page/Main-EN.json';
import HomeFooterVI from './locales/vi/home-page/Footer-VI.json';
import HomeFooterEN from './locales/en/home-page/Footer-EN.json';
import AboutEN from './locales/en/introduction-page/AboutUs-EN.json';
import AboutVI from './locales/vi/introduction-page/AboutUs-VI.json';
import TrackVI from "./locales/vi/track-page/TrackTranslation-VI.json";
import TrackEN from './locales/en/track-page/TrackTranslation-EN.json';
import ServiceEN from './locales/en/service-page/Service-EN.json';
import ServiceVI from './locales/vi/service-page/Service-VI.json';
import RecruitmentEN from './locales/en/carrer-page/RecruitmentEN.json';
import RecruitmentVI from './locales/vi/carrer-page/RecruitmentVI.json';
import LifeVI from './locales/vi/carrer-page/Life-VI.json';
import LifeEN from './locales/en/carrer-page/Life-EN.json';
import ContactVI from './locales/vi/customer-page/Contact-VI.json';
import ContactEN from './locales/en/customer-page/Contact-EN.json';
import ConsultantVI from './locales/vi/customer-page/Consultant-VI.json';
import ConsultantEN from "./locales/en/customer-page/Consultant-EN.json";
import BlogVI from "./locales/vi/blog-page/blog-VI.json";
import BlogEN from "./locales/en/blog-page/blog-En.json"

export const locales = {
  en: "EN",
  vi: "VI"
}
// the translations
const resources = {
  en: {
    Header: HeaderEN,
    Main: HomeMainEN,
    Footer: HomeFooterEN,
    About: AboutEN,
    Track: TrackEN,
    Service: ServiceEN,
    Recruitment: RecruitmentEN,
    Life: LifeEN,
    Contact: ContactEN,
    Consultant: ConsultantEN,
    Blog: BlogEN
  },
  vi: {
    Header: HeaderVI,
    Main: HomeMainVI,
    Footer: HomeFooterVI,
    About: AboutVI,
    Track: TrackVI,
    Service: ServiceVI,
    Recruitment: RecruitmentVI,
    Life: LifeVI,
    Contact: ContactVI,
    Consultant: ConsultantVI,
    Blog: BlogVI
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources,
    ns: ["Header", "Main", "Footer", "About", "Track", "Service", "Recruitment", "Life", "Contact", "Consultant", "Blog"],
    fallbackLng: "vi",
    debug: true,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;