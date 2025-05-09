// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile menu functionality
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navOverlay = document.getElementById("navOverlay");

menuToggle.addEventListener("click", function () {
  mainNav.classList.toggle("active");
  navOverlay.classList.toggle("active");
  if (mainNav.classList.contains("active")) {
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

navOverlay.addEventListener("click", function () {
  mainNav.classList.remove("active");
  navOverlay.classList.remove("active");
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
});

// Smooth scrolling for anchor links and close mobile menu when clicking nav items
document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Get the target element
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    // Close mobile menu if open
    if (window.innerWidth <= 768) {
      mainNav.classList.remove("active");
      navOverlay.classList.remove("active");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    // Scroll to the target element
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Correction pour l'animation du bouton "Voir mon portfolio"
document.querySelector(".btn").addEventListener("mouseenter", function () {
  this.style.animation = "none"; // Reset l'animation si elle existe
  setTimeout(() => {
    this.style.animation = "";
  }, 10);
});

// Amélioration du modal pour la galerie
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("modalCaption");
const galleryItems = document.querySelectorAll(".gallery-item");
let currentIndex = 0;

galleryItems.forEach((item, index) => {
  item.addEventListener("click", function () {
    modal.style.display = "flex"; // Changement de "block" à "flex"
    modal.classList.add("active"); // Ajout de la classe active
    modalImg.src = this.querySelector("img").src;
    captionText.innerHTML =
      this.querySelector(".gallery-item-overlay-content h3").innerHTML +
      " - " +
      this.querySelector(".gallery-item-overlay-content p").innerHTML;
    currentIndex = index;
  });
});

// Fermeture améliorée du modal
document.querySelector(".modal-close").addEventListener("click", function () {
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300); // Correspond à la durée de transition
});

// Navigation améliorée dans le modal
document.querySelector(".modal-prev").addEventListener("click", function () {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateModal();
});

document.querySelector(".modal-next").addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateModal();
});

function updateModal() {
  const currentItem = galleryItems[currentIndex];

  // Animation de transition
  modalImg.style.opacity = 0;

  setTimeout(() => {
    modalImg.src = currentItem.querySelector("img").src;
    captionText.innerHTML =
      currentItem.querySelector(".gallery-item-overlay-content h3").innerHTML +
      " - " +
      currentItem.querySelector(".gallery-item-overlay-content p").innerHTML;
    modalImg.style.opacity = 1;
  }, 200);
}

// Amélioration du défilement doux pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Obtenir l'élément cible
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    // Fermer le menu mobile s'il est ouvert
    if (window.innerWidth <= 768) {
      const mainNav = document.getElementById("mainNav");
      const navOverlay = document.getElementById("navOverlay");
      const menuToggle = document.getElementById("menuToggle");

      mainNav.classList.remove("active");
      navOverlay.classList.remove("active");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    // Faire défiler vers l'élément cible avec une marge pour le header fixe
    if (targetElement) {
      const headerHeight = document.getElementById("header").offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Correction pour la hauteur des éléments de la galerie sur mobile
function adjustGalleryItemsHeight() {
  if (window.innerWidth <= 768) {
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item) => {
      // Calcul du ratio d'aspect approprié pour le contenu
      const img = item.querySelector("img");
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const width = item.offsetWidth;

      // Définir une hauteur proportionnelle mais avec un minimum
      const calculatedHeight = width / aspectRatio;
      const minHeight = 200; // Hauteur minimale

      item.style.height = Math.max(calculatedHeight, minHeight) + "px";
    });
  } else {
    // Restaurer la hauteur définie dans le CSS pour les écrans plus grands
    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.style.height = "600px";
    });
  }
}

// Exécuter au chargement et au redimensionnement
window.addEventListener("load", adjustGalleryItemsHeight);
window.addEventListener("resize", adjustGalleryItemsHeight);
function updateModal() {
  const currentItem = galleryItems[currentIndex];
  modalImg.src = currentItem.querySelector("img").src;
  captionText.innerHTML =
    currentItem.querySelector(".gallery-item-overlay-content h3").innerHTML +
    " - " +
    currentItem.querySelector(".gallery-item-overlay-content p").innerHTML;
}

// Contact form (placeholder functionality)
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert(
    "Merci pour votre message ! Cette fonctionnalité serait connectée à un serveur sur un site réel."
  );
  this.reset();
});

// Vous pouvez supprimer ou modifier cette partie puisque FormSubmit gère l'envoi
document.getElementById("contactForm").addEventListener("submit", function (e) {
  // Ne pas empêcher la soumission du formulaire car nous utilisons FormSubmit
  // Vous pouvez ajouter ici d'autres validations si nécessaire
  console.log("Formulaire soumis à FormSubmit");
});
