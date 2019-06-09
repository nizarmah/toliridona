/* 
 * FireBase Messaging
 * ------------------------------------------------------------------------- 
 */

importScripts('https://www.gstatic.com/firebasejs/5.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.0/firebase-messaging.js');

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

messaging.setBackgroundMessageHandler(function(payload) {
	console.log('Firebase Messaging : Received background message ', payload);

	var notificationTitle = 'To Liridona';
	var notificationOptions = {
		body: payload.data.message,
		icon: '/toliridona/img/icon.png',
		priority: 'high'
	};

	return self.registration.showNotification(notificationTitle,
				notificationOptions);
});

/* ------------------------------------------------------------------------- */

/* 
 * PWA Caching
 * ------------------------------------------------------------------------- 
 */

self.addEventListener("install", function(event) {
	event.waitUntil(preLoad());
});

var preLoad = function(){
	console.log("Installing web app");
	return caches.open("offline").then(function(cache) {
		console.log("caching index");
		return cache.addAll([
			"/toliridona/"
		]);
	});
};

self.addEventListener("fetch", function(event) {
	event.respondWith(checkResponse(event.request).catch(function() {
		return returnFromCache(event.request);
	}));
	event.waitUntil(addToCache(event.request));
});

var checkResponse = function(request){
	return new Promise(function(fulfill, reject) {
		fetch(request).then(function(response){
			if(response.status !== 404) {
				fulfill(response);
			} else {
				reject();
			}
		}, reject);
	});
};

var addToCache = function(request){
	if (request.url.startsWith('https://firestore'))
		return;

	return caches.open("offline").then(function (cache) {
		return fetch(request).then(function (response) {
			console.log(response.url + " was cached");
			return cache.put(request, response);
		});
	});
};

var returnFromCache = function(request){
	return caches.open("offline").then(function (cache) {
		return cache.match(request).then(function (matching) {
			if(!matching || matching.status == 404) {
				return cache.match("index.html");
			} else {
				return matching;
			}
		});
	});
};

/* ------------------------------------------------------------------------- */