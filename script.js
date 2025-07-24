document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("photoGallery");
  const dialog = document.getElementById("photoDialog");
  const dialogImage = document.getElementById("dialogImage");
  const dialogTitle = document.getElementById("dialogTitle");
  const imageIndex = document.getElementById("imageIndex");
  const closeDialogBtn = document.getElementById("closeDialogBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  const photoCount = 12;
  let currentIndex = 0;
  let images = [];

  // Funktion zum Anzeigen des Bilddialogs
  const openDialog = (i) => {
    currentIndex = i;
    updateDialog(currentIndex);
    dialog.showModal();
  };

  // Funktion zum Aktualisieren des Dialoginhalts
  const updateDialog = (i) => {
    const img = images[i];
    dialogImage.src = img.src;
    dialogTitle.textContent = img.alt || `Foto ${i + 1}`;
    imageIndex.textContent = `${i + 1}/${images.length}`;
  };

  // Funktion zum Wechseln des Bildes (vor/zurück)
  const changeImage = (dir) => {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    updateDialog(currentIndex);
  };

  // **Render-Funktion für die Galerie**
  const renderGallery = (count) => {
    gallery.innerHTML = ""; // Galerie leeren (für möglichen Neurender)
    for (let i = 1; i <= count; i++) {
      const img = document.createElement("img");
      img.src = `./img/photo${i}.png`;
      img.alt = `Photo ${i}`;
      img.className = "photo-item";
      img.addEventListener("click", () => openDialog(i - 1));

      const div = document.createElement("div");
      div.className = "photo-item";
      div.appendChild(img);
      gallery.appendChild(div);
    }
    images = gallery.querySelectorAll("img"); // Bilder nach dem Rendern erfassen
  };

  // Galerie initial rendern
  renderGallery(photoCount);

  // Button- und Tastatursteuerung
  nextBtn.addEventListener("click", () => changeImage(1));
  prevBtn.addEventListener("click", () => changeImage(-1));
  closeDialogBtn.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (e) => {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left || e.clientX > r.right ||
      e.clientY < r.top || e.clientY > r.bottom
    ) dialog.close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dialog.open) dialog.close();
  });
});
