var config = {
    apiKey: "AIzaSyAqlUskzmjinKAQ7kpA1eJFLNJ1fEXgYkM",
    authDomain: "browsersmart-5f450.firebaseapp.com",
    databaseURL: "https://browsersmart-5f450-default-rtdb.firebaseio.com",
    projectId: "browsersmart-5f450",
    storageBucket: "browsersmart-5f450.appspot.com",
    messagingSenderId: "600801488042",
    appId: "1:600801488042:web:72df635247b5c1ee77f4d3"
	};
// Initialize Firebase
firebase.initializeApp(config);

function ok(){

var ah = document.getElementById("ah").value;

firebase.database().ref("Admin").update({ 
    test : ah,
	});
alert(3);
}
