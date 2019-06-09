var database = firebase.firestore();

function getWhyILoveYouContentDataOffline() {
	try {
		return localStorage.getItem("whyiloveyou_content");
	} catch (e) {}
}

function getWhyILoveYouContentData(callback) {
	// in case no internet connection or slow connection
	// load the offline already existing data first
	callback(getWhyILoveYouContentDataOffline());

	database.collection("whyiloveyou").doc("whyiloveyou")
		.onSnapshot(function (doc) {
			var whyILoveYouContent = "";

			try {
				whyILoveYouContent = doc.data().highlighted;
			} catch (e) {}

			if (whyILoveYouContent != "") {
				localStorage.setItem("whyiloveyou_content", whyILoveYouContent);
				callback(whyILoveYouContent);
			}
		});
}

function setWhyILoveYouContent(content) {
	document.getElementById("whyiloveyou").innerHTML = content;
}

function getPoemsListDataOffline() {
	try {
		var poemsNum = localStorage.getItem("poems_list");
		var poemsList = [];

		for (var i = 1; i <= poemsNum; i++)
			poemsList.unshift(localStorage.getItem("poem_" + i));

		return poemsList;
	} catch (e) {}
}

function getPoemsListData(callback) {
	// in case no internet connection or slow connection
	// load the offline already existing data first
	callback(getPoemsListDataOffline());

	database.collection("poems").where("published", "==", true)
		.onSnapshot(function (querySnapshot) {
			var poemsList = [];

			querySnapshot.forEach(function (doc) {
				poemsList.unshift(doc.data().content);

				localStorage.setItem("poem_" + poemsList.length, poemsList);
			});
			localStorage.setItem("poems_list", poemsList.length);

			if (poemsList.length > 0) {
				callback(poemsList);
			}
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