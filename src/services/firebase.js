import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { push } from "gatsby-link";

const config = {
	apiKey: "AIzaSyAxLYhZOMN_0bl6c53fesJpz2pI3rckE_Q",
	authDomain: "presents-3b848.firebaseapp.com",
	databaseURL: "https://presents-3b848.firebaseio.com",
	projectId: "presents-3b848",
	storageBucket: "presents-3b848.appspot.com",
	messagingSenderId: "998254999056"
};
export const app = firebase.initializeApp(config);
export const facebook = new firebase.auth.FacebookAuthProvider();
export const google = new firebase.auth.GoogleAuthProvider();

const firestore = app.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

export const auth = app.auth();
auth.onAuthStateChanged(user => {
	if (user) push("/");
	else push("login");
});
