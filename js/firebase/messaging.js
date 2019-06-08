// // Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyDrFTtoY_amG2p-tI_2YmPkV6TJoRNzrVg",
	authDomain: "toliridona.firebaseapp.com",
	databaseURL: "https://toliridona.firebaseio.com",
	projectId: "toliridona",
	storageBucket: "toliridona.appspot.com",
	messagingSenderId: "856375581322",
	appId: "1:856375581322:web:370056882eaeddb3"
};
firebase.initializeApp(firebaseConfig);

var messaging = firebase.messaging();

messaging.requestPermission()
	.then(function () {
		console.log("Firebase Messaging : Permission granted");

		return messaging.getToken();
	})
	.then(function (token) {
		console.log("Firebase Messaging : Token retrieved");
	})
	.catch(function (err) {
		console.log("Firebase Messaging : Error occured");
	});

messaging.onTokenRefresh(function() {
	messaging.getToken()
		.then(function(refreshedToken) {
			console.log('Firebase Messaging : Token refreshed');

			addToTopic("toliridona", refreshedToken);
		})
		.catch(function(err) {
			console.log('Firebase Messaging : Unable to retrieve refreshed token');
		});
});


messaging.onMessage(function (payload) {
	UIkit.notification({
		timeout: 1000000,
		pos: 'bottom-left',
		message: payload.data.message 
	});
});

function addToTopic(topic, token) {
	var req_url = "https://cors.io?https://us-central1-toliridona.cloudfunctions.net/addToTopic";
	var req_par = [];

	req_par.push("topic=" + topic);
	req_par.push("token=" + token);

	var request	= new XMLHttpRequest();

	request.open("GET", req_url + "?" + req_par.join("&"), false);
	request.onreadystatechange = function () {
		if(request.readyState === 4)
		{
			if(request.status === 200 || request.status == 0)
			{
				console.log('Firebase Messaging : Subscribed to Topic');
			}
		}
	};
	request.send();
}