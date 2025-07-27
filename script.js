// Dialog für großes Bild
let photoDialog = document.getElementById("photo-dialog");

// Galerie-Container
let gallery = document.getElementById("photoGallery");

// Bilderliste
let photos = [
  { src: "./img/photo1.png" },
  { src: "./img/photo2.png" },
  { src: "./img/photo3.png" },
  { src: "./img/photo4.png" },
  { src: "./img/photo5.png" },
  { src: "./img/photo6.png" },
  { src: "./img/photo7.png" },
  { src: "./img/photo8.png" },
  { src: "./img/photo9.png" },
  { src: "./img/photo10.png" },
  { src: "./img/photo11.png" },
  { src: "./img/photo12.png" }
];

// Aktuelles Bild
let currentIndex = 0;

// Bilder anzeigen
function render() {
  gallery.innerHTML = "";
  for (let i = 0; i < photos.length; i++) {
    gallery.innerHTML += getNotesHtml(photos[i], i);
  }
}

// HTML für ein Bild
function getNotesHtml(photo, index) {
  return `
    <div class="photo-item">
      <img src="${photo.src}" />
      <button class="info-button" data-index="${index}">ℹ️</button>
    </div>`;
}

// Klick auf Galerie
gallery.addEventListener("click", (event) => {
  // Info-Button
  if (event.target.classList.contains("info-button")) {
    event.stopPropagation();
    const index = parseInt(event.target.dataset.index);
    alert(`Info zu Bild ${index + 1}`);
    return;
  }

  // Bild öffnen
  if (event.target.tagName === "IMG") {
    const allImages = gallery.querySelectorAll("img");
    const index = Array.from(allImages).indexOf(event.target);
    openDialog(index);
  }
});

// Dialog öffnen
function openDialog(index) {
  currentIndex = index;
  dialogImage.src = photos[index].src;
  imageIndex.textContent = `${index + 1}/${photos.length}`;
  photoDialog.showModal();
}

// Dialog schließen
function closeDialog() {
  photoDialog.close();
}

// Vorheriges Bild
function showPrev() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  openDialog(currentIndex);
}

// Nächstes Bild
function showNext() {
  currentIndex = (currentIndex + 1) % photos.length;
  openDialog(currentIndex);
}

// Buttons & Tasten
closeDialogBtn.addEventListener("click", closeDialog);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

// ESC schließt Dialog
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDialog();
  }
});

// Start
render();
