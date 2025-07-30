import * as yup from 'yup';

export default (url, urlList) => {
   yup.setLocale({
      mixed: {
         required: 'empty',
         notOneOf: 'exist',
      },
      string: {
        url: 'notAUrl',
      },
   })
    const userSchema = yup.string()
      .required()
      .url()
      .notOneOf(urlList);
    return userSchema.validate(url)
      .then(() => {
         return null;
      })
      .catch((e) => {
         return e.message;
      })
};