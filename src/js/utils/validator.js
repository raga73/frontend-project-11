import * as yup from 'yup';

export default (url, watcher) => {
   yup.setLocale({
      mixed: {
         required: 1,
         url: 2,
         matches: 3,
         notOneOf: 4,
      }
   })
    const userSchema = yup.string()
      .required()
      .url()
      .matches(/(\.rss|\.xml)/)
      .notOneOf(watcher.feedsList);
    userSchema.validate(url)
      .then((validUrl) => {
         watcher.feedsList.push(validUrl);
      })
      .catch((e) => {
         watcher.error = e.message;
      })
};