var database = firebase.firestore();

function getWhyILoveYouContentDataOffline() {
	try {
		return localStorage.getItem("whyiloveyou_content");
	} catch (e) {}
}

function getWhyILoveYouContentData(callback) {
	if (!navigator.onLine) {
		return callback(getWhyILoveYouContentDataOffline());
	}

	database.collection("whyiloveyou").doc("whyiloveyou")
		.onSnapshot(function (doc) {
			localStorage.setItem("whyiloveyou_content", doc.data().highlighted);

			return callback(doc.data().highlighted);
		});
}

function setWhyILoveYouContent(content) {
	document.getElementById("whyiloveyou").innerHTML = content;
}

function getPoemsListDataOffline() {
	try {
		var poemsList = [];
		if (localStorage.getItem("poems_list").length > 0)
			poemsList = localStorage.getItem("poems_list");

		return poemsList;
	} catch (e) {}
}

function getPoemsListData(callback) {
	if (!navigator.onLine) {
		return callback(getPoemsListDataOffline());
	}

	database.collection("poems").where("published", "==", true)
		.onSnapshot(function (querySnapshot) {
			var poemsList = [];

			querySnapshot.forEach(function (doc) {
				poemsList.unshift(doc.data().content);
			});

			localStorage.setItem("poems_list", poemsList);
			
			return callback(poemsList);
		});
}

function formatPoemContent(content) {
	var data = content;
	data = data.split("#");
	data[3] = data[3].split(">");
	data[3] = data[3].slice(1, data[3].length);

	var li_poem = document.createElement("LI");
	
	var title = document.createElement("A");
	title.className	= "uk-accordion-title";
	title.href = "#";

	var text_title = document.createTextNode(data[1].trim());
	title.appendChild(text_title);
	li_poem.appendChild(title);

	var content = document.createElement("UL");
	content.className = "uk-accordion-content";
	data[3].forEach(function (line) {
		line = line.trim();
		if (line.length == 0)
			line = " ";

		var li_line = document.createElement("LI");

		var text_line = document.createTextNode(line);
		li_line.appendChild(text_line);

		content.appendChild(li_line);
	});
	li_poem.appendChild(content);

	return li_poem;
}

function setPoemsList(poemsList) {
	var container = document.createElement("DIV");
	poemsList.forEach(function (content) {
		container.appendChild(formatPoemContent(content));
	});

	document.getElementById("poemlist").innerHTML = container.innerHTML;
}

window.addEventListener("load", function () {
	getWhyILoveYouContentData(setWhyILoveYouContent);

	getPoemsListData(setPoemsList);
	// setPoemsList(getPoemsListData());
});