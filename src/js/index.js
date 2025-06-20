import app from './main.js';
import i18next from 'i18next';
import ru from './locales/ru.js';


const initializateI18n = () => {
  const defaultLanguage = 'ru';
  const instance = i18next.createInstance();
  return instance.init({
    lng: defaultLanguage,
    debug: true,
    resources: {
        ru,
    }
  }).then(() => {
    return instance;
})
};

initializateI18n()
.then((i18nInstance) => {
    app(i18nInstance)
});