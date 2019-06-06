function readPoem(poem, callback) {
	if (!navigation.online) {
		try {
			return callback(localStorage.getItem(poem));
		} catch (e) {}
	}

	var rawFile	= new XMLHttpRequest();

	rawFile.open("GET", "poems/" + poem, false);
	rawFile.onreadystatechange = function () {
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				var allText	= rawFile.responseText;
				allText		= allText.split("#");
				allText[3]	= allText[3].split(">");
				allText[3]	= allText[3].slice(1, allText[3].length);

				try {
					localStorage.setItem(poem, allText);
				} catch (e) {}

				return callback(allText);
			}
		}
	}
	rawFile.send(null);
}

function windowLoad() {
	num_poems = 0;
	poems.forEach(function (poem) {
		readPoem(poem, function (data) {
			var li_poem			= document.createElement("LI");
			if (num_poems == 0)
				li_poem.className = "uk-open";
			num_poems += 1;

			var title			= document.createElement("A");
			title.className		= "uk-accordion-title";
			title.href			= "#";

			var text_title		= document.createTextNode(data[1].trim());
			title.appendChild(text_title);
			li_poem.appendChild(title);

			var content			= document.createElement("UL");
			content.className	= "uk-accordion-content";
			data[3].forEach(function (line) {
				line = line.trim();
				if (line.length == 0)
					line = " ";

				var li_line		= document.createElement("LI");

				var text_line	= document.createTextNode(line);
				li_line.appendChild(text_line);

				content.appendChild(li_line);
			});
			li_poem.appendChild(content);

			document.getElementById("poemlist").appendChild(li_poem);
		});
	});
};

window.addEventListener('load', windowLoad);