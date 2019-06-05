function openSection(sectionId) {
	document.querySelectorAll(".card-container").forEach(function (cardContainer) {
		cardContainer.style.display = "none";
	});

	document.querySelector(sectionId).style.display = "block";
}

document.querySelectorAll(".navbar-link").forEach(function (navbarLink) {
	console.log("HEY");
	navbarLink.addEventListener("click", function () {
		openSection(navbarLink.href);
	});
});