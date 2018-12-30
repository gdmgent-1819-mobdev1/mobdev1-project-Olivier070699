const firebaseInstance = require('firebase');

// Initialize Firebase
// TODO: Replace with your project's config
const config = {
  apiKey: 'AIzaSyD0AOVTK7QAvti21ruehaxVEDPDUG0CXzo',
  authDomain: 'eind-labo.firebaseapp.com',
  databaseURL: 'https://eind-labo.firebaseio.com',
  projectId: 'eind-labo',
  storageBucket: 'eind-labo.appspot.com',
  messagingSenderId: '52666332181',
};

let instance = null;

const initFirebase = () => {
  instance = firebaseInstance.initializeApp(config);
};

const getInstance = () => {
  if (!instance) {
    initFirebase();
  }
  return instance;
};
export {
  initFirebase,
  getInstance,
};
