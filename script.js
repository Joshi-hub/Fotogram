// Wartet, bis die komplette Webseite geladen ist
document.addEventListener("DOMContentLoaded", () => {
  // Holt sich die wichtigsten HTML-Elemente aus der Seite
  const gallery = document.getElementById("photoGallery");
  const dialog = document.getElementById("photoDialog");
  const dialogImage = document.getElementById("dialogImage");
  const dialogTitle = document.getElementById("dialogTitle");
  const imageIndex = document.getElementById("imageIndex");
  const closeDialogBtn = document.getElementById("closeDialogBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  const photoCount = 12; // Anzahl der Bilder in der Galerie
  let currentIndex = 0; // Aktuell angezeigtes Bild im Dialog
  let images = []; // Hier werden alle Bild-Elemente gespeichert

  // Öffnet den Bild-Dialog und zeigt das gewählte Bild an
  const openDialog = (i) => {
    currentIndex = i;
    updateDialog(currentIndex); // Aktualisiert Bild und Infos
    dialog.showModal(); // Öffnet den Dialog
  };

  // Zeigt das Bild, den Titel und den Index im Dialog an
  const updateDialog = (i) => {
    const img = images[i];
    dialogImage.src = img.src; // Setzt das Bild
    dialogTitle.textContent = img.alt || `Foto ${i + 1}`; // Setzt den Titel
    imageIndex.textContent = `${i + 1}/${images.length}`; // Zeigt aktuelle Bildnummer
  };

  // Wechselt zum nächsten oder vorherigen Bild
  const changeImage = (dir) => {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    updateDialog(currentIndex); // Zeigt das neue Bild an
  };

  // Baut die Galerie mit den Bildern auf
  const renderGallery = (count) => {
    gallery.innerHTML = ""; // Leert die Galerie zuerst
    for (let i = 1; i <= count; i++) {
      const img = document.createElement("img"); // Erstellt ein neues Bild
      img.src = `./img/photo${i}.png`; // Bildquelle
      img.alt = `Photo ${i}`; // Alternativtext
      img.className = "photo-item";
      img.addEventListener("click", () => openDialog(i - 1)); // Öffnet Dialog bei Klick

      const div = document.createElement("div"); // Hülle um das Bild
      div.className = "photo-item";
      div.appendChild(img);
      gallery.appendChild(div); // Fügt das Bild zur Galerie hinzu
    }
    images = gallery.querySelectorAll("img"); // Speichert alle Bilder in der Galerie
  };

  // Startet die Galerie beim Laden der Seite
  renderGallery(photoCount);

  // Wenn „Weiter“-Button geklickt wird → nächstes Bild
  nextBtn.addEventListener("click", () => changeImage(1));

  // Wenn „Zurück“-Button geklickt wird → vorheriges Bild
  prevBtn.addEventListener("click", () => changeImage(-1));

  // Schließt den Dialog beim Klick auf den „Schließen“-Button
  closeDialogBtn.addEventListener("click", () => dialog.close());

  // Wenn man außerhalb des Dialogfensters klickt → Dialog schließen
  dialog.addEventListener("click", (e) => {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left || e.clientX > r.right ||
      e.clientY < r.top || e.clientY > r.bottom
    ) dialog.close();
  });

  // Wenn die „Escape“-Taste gedrückt wird → Dialog schließen
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dialog.open) dialog.close();
  });
});
