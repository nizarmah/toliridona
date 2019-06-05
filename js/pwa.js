function openSection(sectionId) {
	document.querySelectorAll(".card-container").forEach(function (cardContainer) {
		cardContainer.style.display = "none";
	});

	document.querySelector(sectionId).style.display = "block";
}

window.addEventListener("load", function () {
	document.querySelectorAll(".navbar-link").forEach(function (navbarLink) {
		console.log("HEY");
		navbarLink.addEventListener("click", function () {
			openSection(navbarLink.dataset.target);
		});
	});
});