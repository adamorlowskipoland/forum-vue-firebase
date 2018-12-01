import firebase from 'firebase';
import { helpers } from 'vuelidate/lib/validators';

const uniqueUsername = (value) => {
  if (!helpers.req(value)) {
    return true;
  }
  return new Promise(((resolve) => {
    firebase.database().ref('users').orderByChild('usernameLower')
      .equalTo(value.toLowerCase())
      .once('value', snapshot => resolve(!snapshot.exists()));
  }));
};

const uniqueEmail = (value) => {
  if (!helpers.req(value)) {
    return true;
  }
  return new Promise(((resolve) => {
    firebase.database().ref('users').orderByChild('email')
      .equalTo(value.toLowerCase())
      .once('value', snapshot => resolve(!snapshot.exists()));
  }));
};

const supportedImageFile = (value) => {
  if (!helpers.req(value)) {
    return true;
  }
  const supported = ['jpg', 'jpeg', 'gif', 'png', 'svg'];
  const suffix = value.split('.').pop();
  return supported.includes(suffix);
};

const imageOk = (value) => {
  if (!helpers.req(value)) {
    return true;
  }
  return new Promise((resolve) => {
    fetch(value)
      .then(response => resolve(response.ok))
      .catch(() => resolve(false));
  });
};

export { uniqueUsername, uniqueEmail, supportedImageFile, imageOk };
