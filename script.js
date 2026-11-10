
/* =========================================
   HALO MASSAGE BANDUNG - WEBSITE SCRIPT
========================================= */

const phoneNumber = "6289523473025";

/* Kurs referensi. Harga Ringgit merupakan perkiraan. */
const MYR_PER_IDR = 0.0002244;

const services = [
  {group:"90", duration:"90 menit", name:"Full Body Massage", price:200},
  {group:"90", duration:"90 menit", name:"Full Body Massage + Reflexology", price:230},
  {group:"90", duration:"90 menit", name:"Full Body Massage + Totok Wajah", price:230},
  {group:"90", duration:"90 menit", name:"Full Body Massage + Kerikan", price:230},
  {group:"90", duration:"90 menit", name:"Full Body Massage + Dry Cuping/Bekam Kering", price:245},
  {group:"90", duration:"90 menit", name:"Full Body Massage + Bekam Basah", price:265},
  {group:"90", duration:"90 menit", name:"Full Body Massage + Scrub", price:265},

  {group:"120", duration:"120 menit", name:"Full Body Massage", price:250},
  {group:"120", duration:"120 menit", name:"Full Body Massage + Reflexology", price:280},
  {group:"120", duration:"120 menit", name:"Full Body Massage + Totok Wajah", price:280},
  {group:"120", duration:"120 menit", name:"Full Body Massage + Kerikan", price:280},
  {group:"120", duration:"120 menit", name:"Full Body Massage + Dry Cuping/Bekam Kering", price:300},
  {group:"120", duration:"120 menit", name:"Full Body Massage + Bekam Basah", price:335},
  {group:"120", duration:"120 menit", name:"Full Body Massage + Scrub", price:335},

  {group:"complete", duration:"2 jam 15 menit", name:"Massage + Reflexology + Totok Wajah", price:365},
  {group:"complete", duration:"2 jam 15 menit", name:"Massage + Reflexology + Dry Cuping/Kop Badan", price:365},
  {group:"complete", duration:"2 jam 15 menit", name:"Massage + Reflexology + Bekam Basah", price:375},
  {group:"complete", duration:"2 jam 15 menit", name:"Massage + Body Scrub + Totok Wajah", price:375}
];

/* FORMAT HARGA RUPIAH */
function rupiah(thousands) {
  return "Rp " + (thousands * 1000).toLocaleString("id-ID");
}

/* FORMAT HARGA RINGGIT */
function ringgit(thousands) {
  const amount = thousands * 1000 * MYR_PER_IDR;

  return "RM " + amount.toLocaleString("en-MY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/* LINK PEMESANAN WHATSAPP */
function makeWhatsAppLink(service) {
  const message = `Halo Halo Massage Bandung, saya ingin memesan:

Treatment: ${service.name}
Durasi: ${service.duration}
Harga: ${rupiah(service.price)} (sekitar ${ringgit(service.price)})

Mohon informasi ketersediaan jadwal dan konfirmasi area layanan.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

/* MENAMPILKAN DAFTAR LAYANAN */
const grid = document.querySelector("#service-grid");
const tabs = [...document.querySelectorAll(".tab")];

function renderServices(filter = "all") {
  if (!grid) return;

  const visible = services.filter(item =>
    filter === "all" || item.group === filter
  );

  grid.innerHTML = visible.map(item => `
    <article class="service-card">

      <div class="card-top">
        <span class="duration-tag">${item.duration}</span>
        <span class="card-mark">✳</span>
      </div>

      <h3>${item.name}</h3>

      <div class="card-price">
        <span class="price-idr">${rupiah(item.price)}</span>
        <span class="price-myr">${ringgit(item.price)}</span>
        <small>/ paket</small>
      </div>

      <a class="card-order"
         href="${makeWhatsAppLink(item)}"
         target="_blank"
         rel="noopener">

        Pesan paket ini <span>↗</span>

      </a>

    </article>
  `).join("");
}

/* FILTER KATEGORI LAYANAN */
tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(item => {
      const active = item === tab;

      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });

    renderServices(tab.dataset.filter);
  });
});

renderServices();

/* TAHUN OTOMATIS DI FOOTER */
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* NAVIGASI MOBILE */
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (toggle && nav) {

  toggle.addEventListener("click", () => {

    const open = nav.classList.toggle("open");

    toggle.setAttribute("aria-expanded", String(open));

    toggle.setAttribute(
      "aria-label",
      open ? "Tutup menu navigasi" : "Buka menu navigasi"
    );

  });

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");

    });

  });
}

/* ARTIKEL BACA SELENGKAPNYA */
function setupArticle(readId, fullId, closeId) {

  const readButton = document.getElementById(readId);
  const fullArticle = document.getElementById(fullId);
  const closeButton = document.getElementById(closeId);

  if (!readButton || !fullArticle || !closeButton) return;

  readButton.addEventListener("click", () => {

    fullArticle.hidden = false;

    readButton.setAttribute("aria-expanded", "true");

    fullArticle.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

  closeButton.addEventListener("click", () => {

    fullArticle.hidden = true;

    readButton.setAttribute("aria-expanded", "false");

    readButton.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  });

}

setupArticle("readArticle", "articleFull", "closeArticle");
setupArticle("readArticle2", "articleFull2", "closeArticle2");

/* SLIDER GALERI 3 FOTO */
(() => {

  const track = document.getElementById("gallerySliderTrack");
  const dotsWrap = document.getElementById("gallerySliderDots");

  if (!track || !dotsWrap) return;

  const slides = [...track.children];
  const dots = [...dotsWrap.querySelectorAll(".gallery-dot")];

  const previous = document.querySelector(".gallery-prev");
  const next = document.querySelector(".gallery-next");

  let current = 0;
  let touchStartX = 0;

  function showSlide(index) {

    current = (index + slides.length) % slides.length;

    track.style.transform =
      `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
    });

  }

  previous?.addEventListener("click", () => {
    showSlide(current - 1);
  });

  next?.addEventListener("click", () => {
    showSlide(current + 1);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  track.addEventListener("touchstart", event => {

    touchStartX = event.changedTouches[0].screenX;

  }, {passive:true});

  track.addEventListener("touchend", event => {

    const delta =
      event.changedTouches[0].screenX - touchStartX;

    if (Math.abs(delta) > 45) {

      showSlide(current + (delta < 0 ? 1 : -1));

    }

  }, {passive:true});

})();

/* LIGHTBOX FOTO GALERI */
const lightbox = document.querySelector("#lightbox");

if (lightbox) {

  const lightboxImg = lightbox.querySelector("img");

  document.querySelectorAll(".gallery-slide img").forEach(img => {

    img.addEventListener("click", () => {

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;

      lightbox.classList.add("open");

      lightbox.setAttribute("aria-hidden", "false");

    });

    img.style.cursor = "zoom-in";

  });

  function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute("aria-hidden", "true");

    lightboxImg.src = "";

  }

  lightbox
    .querySelector(".lightbox-close")
    ?.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });

}

/* PREVIEW FOTO TESTIMONI */
(() => {

  const phones = [
    ...document.querySelectorAll("[data-review-image]")
  ];

  if (!phones.length) return;

  const preview = document.createElement("div");

  preview.className = "review-lightbox";

  preview.setAttribute("aria-hidden", "true");

  preview.innerHTML = `
    <button type="button" aria-label="Tutup testimoni">×</button>
    <img alt="Testimoni pelanggan Halo Massage diperbesar">
  `;

  document.body.appendChild(preview);

  const image = preview.querySelector("img");
  const closeButton = preview.querySelector("button");

  function closePreview() {

    preview.classList.remove("is-visible");

    preview.setAttribute("aria-hidden", "true");

    document.body.classList.remove("review-lightbox-open");

    image.src = "";

  }

  phones.forEach(phone => {

    phone.addEventListener("click", () => {

      image.src = phone.dataset.reviewImage;

      image.alt =
        phone.querySelector("img")?.alt ||
        "Testimoni pelanggan Halo Massage";

      preview.classList.add("is-visible");

      preview.setAttribute("aria-hidden", "false");

      document.body.classList.add("review-lightbox-open");

    });

  });

  closeButton.addEventListener("click", closePreview);

  preview.addEventListener("click", event => {

    if (event.target === preview) {
      closePreview();
    }

  });

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closePreview();
    }

  });

})();
