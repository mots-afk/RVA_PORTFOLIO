document.addEventListener("DOMContentLoaded", () => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  window.scrollTo(0, 0);

  const artworks = window.PORTFOLIO_ARTWORKS || {};
  const order = window.PORTFOLIO_ARTWORK_ORDER || [];
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("art") || order[0];
  const currentId = Object.prototype.hasOwnProperty.call(artworks, requestedId)
    ? requestedId
    : order[0];
  const artwork = artworks[currentId];

  if (!artwork) {
    return;
  }

  const label = document.getElementById("artworkLabel");
  const title = document.getElementById("artworkTitle");
  const subtitle = document.getElementById("artworkSubtitle");
  const description = document.getElementById("artworkDescription");
  const pageTitle = document.getElementById("artworkPageTitle");
  const image = document.getElementById("artworkImage");
  const pdf = document.getElementById("artworkPdf");
  const fallbackLink = document.getElementById("artworkFallbackLink");
  const originalLink = document.getElementById("openOriginalLink");
  const backLink = document.getElementById("backToGallery");
  const prevArtwork = document.getElementById("prevArtwork");
  const nextArtwork = document.getElementById("nextArtwork");

  document.title = `${artwork.label}: ${artwork.title} | Cedrick S. Alejo`;
  label.textContent = artwork.label;
  title.textContent = artwork.title;
  subtitle.textContent = artwork.subtitle;
  description.textContent = artwork.description;
  pageTitle.textContent = artwork.title;
  fallbackLink.href = artwork.file;
  originalLink.href = artwork.file;
  backLink.href = `index.html#${currentId}`;

  document
    .querySelectorAll('a[href="index.html#gallery"]')
    .forEach((link) => {
      link.href = `index.html#${currentId}`;
    });

  if (artwork.type === "pdf") {
    image.hidden = true;
    image.src = "";
    image.alt = "";
    pdf.hidden = false;
    pdf.data = artwork.file;
    pdf.setAttribute("title", artwork.title);
  } else {
    pdf.hidden = true;
    pdf.data = "";
    pdf.removeAttribute("title");
    image.hidden = false;
    image.src = artwork.file;
    image.alt = artwork.alt;
  }

  const currentIndex = order.indexOf(currentId);
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : order.length - 1;
  const nextIndex = currentIndex < order.length - 1 ? currentIndex + 1 : 0;

  prevArtwork.href = `artwork.html?art=${order[prevIndex]}`;
  nextArtwork.href = `artwork.html?art=${order[nextIndex]}`;
});
