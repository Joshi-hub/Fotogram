// Dialogfenster für großes Bild
let photoDialog = document.getElementById("photo-dialog");

// Bereich, in dem die Bilder angezeigt werden
let gallery = document.getElementById("photoGallery");

// Liste mit Bildpfaden
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

// Aktuell angezeigtes Bild im Dialog
let currendIndex = 0;

// Funktion zeigt alle Bilder in der Galerie an
function render() {
  gallery.innerHTML = ""; // vorher leeren

  for (let i = 0; i < photos.length; i++) {
    gallery.innerHTML += getNotesHtml(photos[i]); // jedes Bild einfügen
  }
}

// Gibt HTML für ein einzelnes Bild zurück
function getNotesHtml(photo) {
  return `
    <div class="photo-item">
      <img src="${photo.src}" />
    </div>`;
}

// Öffnet oder schließt ein Overlay (nicht im restlichen Code benutzt)
function toggleoverlay(i) {
  if (overlayRef.classList.contains("d-none")) {
    overlayImage.src = photos[i].src;
    overlayRef.classList.remove("d-none");
  } else {
    overlayRef.classList.add("d-none");
  }
}

// Klick in die Galerie
gallery.addEventListener("click", (event) => {
  // Wenn Info-Button geklickt wurde
  if (event.target.classList.contains("info-button")) {
    event.stopPropagation(); // verhindert weiteren Klick
    const index = parseInt(event.target.dataset.index);
    alert(`Info zu Bild ${index + 1}`);
    return;
  }

  // Wenn ein Bild geklickt wurde
  if (event.target.tagName === "IMG") {
    const allImages = gallery.querySelectorAll("img"); // alle Bilder holen
    const index = Array.from(allImages).indexOf(event.target); // geklicktes Bild finden
    openDialog(index); // Dialog öffnen
  }
});

// Öffnet das Dialogfenster mit dem gewählten Bild
function openDialog(index) {
  currentIndex = index;
  dialogImage.src = photos[index].src;
  imageIndex.textContent = `${index + 1}/${photos.length}`;
  photoDialog.showModal();
}

// Schließt das Dialogfenster
function closeDialog() {
  photoDialog.close();
}

// Zeigt vorheriges Bild
function showPrev() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  openDialog(currentIndex);
}

// Zeigt nächstes Bild
function showNext() {
  currentIndex = (currentIndex + 1) % photos.length;
  openDialog(currentIndex);
}

// Klick auf Schließen-Button im Dialog
closeDialogBtn.addEventListener("click", closeDialog);

// Klick auf "Zurück"-Button
prevBtn.addEventListener("click", showPrev);

// Klick auf "Weiter"-Button
nextBtn.addEventListener("click", showNext);

// ESC-Taste schließt den Dialog
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDialog();
  }
});

// Galerie beim Laden anzeigen
render();
