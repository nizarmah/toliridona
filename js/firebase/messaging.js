var messaging = firebase.messaging();

messaging.requestPermission()
	.then(function () {
		console.log("Firebase Messaging : Permission granted");

		return messaging.getToken();
	})
	.then(function (token) {
		console.log("Firebase Messaging : Token retrieved");

		try {
			if (!localStorage.getItem("subscribed"))
				addToTopic("toliridona", token);
		} catch (e) { addToTopic("toliridona", token); }
	})
	.catch(function (err) {
		console.log("Firebase Messaging : Error occured ", err);
	});

messaging.onMessage(function (payload) {
	UIkit.notification({
		timeout: 1000000,
		pos: 'bottom-left',
		message: payload.data.message 
	});
});

function addToTopic(topic, token) {
	var req_url = "https://us-central1-toliridona.cloudfunctions.net/addToTopic";
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
				localStorage.setItem("subscribed", true);

				console.log('Firebase Messaging : Subscribed to Topic');
			}
		}
	};
	request.send();
}