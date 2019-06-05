function openSection(sectionId) {
	document.querySelectorAll(".card-container").forEach(function (cardContainer) {
		cardContainer.style.display = "none";
	});

	document.querySelector(sectionId).style.display = "block";
}

function pwaSetup() {
	if (window.innerWidth > 768)
		return;

	document.querySelectorAll(".navbar-link").forEach(function (navbarLink) {
		navbarLink.addEventListener("click", function (event) {
			openSection(navbarLink.dataset.target);

			event.preventDefault();
			event.stopPropagation();
		});
	});

	openSection("#home");
}

window.addEventListener("load", pwaSetup);
window.addEventListener("resize", pwaSetup);