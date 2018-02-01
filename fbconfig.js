import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCPUwhBVdsEEVxQDPIpLous8RGb6x5U9Yc",
  authDomain: "potluck-91e71.firebaseapp.com",
  databaseURL: "https://potluck-91e71.firebaseio.com",
  projectId: "potluck-91e71",
  storageBucket: "",
  messagingSenderId: "617862784724"
};

firebase.initializeApp(config);

const database = firebase.database();

export default database;
