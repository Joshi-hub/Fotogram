let photoDialog = document.getElementById("photo-dialog");
let gallery = document.getElementById("photoGallery");
photos = [
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

function render() {
  gallery.innerHTML = ""; 

  for (let i = 0; i < photos.length; i++) {
    gallery.innerHTML += createPhotoHtml(photos[i]);
  }
}

function createPhotoHtml(photo) {
  return `
    <div class="photo-item">
      <img src="${photo.src}" />
    </div>`;
}

gallery.addEventListener("click", (event) => {
  if (event.target.classList.contains("image-button")) {
    event.stopPropagation();
    return;
  }


  if (event.target.tagName === "IMG") {
    event.stopPropagation();
    
    const allImages = gallery.querySelectorAll("img");
    const index = Array.from(allImages).indexOf(event.target);
    openDialog(index);
  }
});

function openDialog(index) {
  currentIndex = index;
  dialogImage.src = photos[index].src;
  imageIndex.textContent = `${index + 1}/${photos.length}`;
  photoDialog.showModal();
}

function closeDialog() {
  photoDialog.close();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  openDialog(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % photos.length;
  openDialog(currentIndex);
}

photoDialog.addEventListener("click", (event) => {
  if (event.target === photoDialog) {
    closeDialog();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDialog();
  }
});

render();