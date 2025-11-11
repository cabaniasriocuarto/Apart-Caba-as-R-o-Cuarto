/*
 * Funcionalidades principales:
 * - Menú hamburguesa
 * - Slider de galería (con video y fotos)
 * - Lightbox para ampliar imágenes
 * - Tracking de eventos (WhatsApp, formulario)
 * - Inserción automática de imágenes en galería
 */

document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.querySelector('.slides');
  const prevButton = document.querySelector('.slider .prev');
  const nextButton = document.querySelector('.slider .next');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox .close');

  let currentIndex = 0;
  let images; // se actualizará al cargar

  // --- MENÚ HAMBURGUESA CORREGIDO ---
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('header nav');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && nav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      
      // Cambiar ícono
      if (nav.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
        document.body.style.overflow = 'hidden';
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
      }
    });

    // Cerrar menú al hacer clic en un enlace
    if (navLinks) {
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('open');
          const icon = navToggle.querySelector('i');
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
          document.body.style.overflow = 'auto';
        });
      });
    }

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('open');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // --- FUNCIÓN SLIDER ---
  function showSlide(index) {
    if (!images || images.length === 0) return;
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  // Botones de navegación
  if (prevButton) {
    prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
  }
  if (nextButton) {
    nextButton.addEventListener('click', () => showSlide(currentIndex + 1));
  }

  // --- LIGHTBOX ---
  function initLightbox() {
    if (!images) return;
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        if (img.tagName.toLowerCase() === 'img') {
          lightbox.style.display = 'flex';
          lightboxImg.src = img.src;
          currentIndex = index;
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    }
  }

  // --- TRACKING ---
  const whatsappFloat = document.querySelector('.whatsapp-float, .wsp-btn');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'clic_whatsapp_flotante', { event_category: 'Interacción', event_label: 'Botón WhatsApp flotante' });
      }
      if (window.dataLayer) window.dataLayer.push({ event: 'clic_whatsapp_flotante' });
    });
  }

  const contactWhatsapp = document.querySelector('.contact-form .social-button.whatsapp');
  if (contactWhatsapp) {
    contactWhatsapp.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'clic_whatsapp_contacto', { event_category: 'Interacción', event_label: 'WhatsApp en contacto' });
      }
      if (window.dataLayer) window.dataLayer.push({ event: 'clic_whatsapp_contacto' });
    });
  }

  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'enviar_formulario', { event_category: 'Interacción', event_label: 'Formulario de contacto' });
        gtag('event', 'conversion', { send_to: 'G-1ZEE3XF0SP', event_category: 'Formulario', event_label: 'Reserva completada' });
      }
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'enviar_formulario' });
        window.dataLayer.push({ event: 'conversion' });
      }
    });
  }

  // --- INSERTAR IMÁGENES ---
  const imageNames = [
    "0", "1", "1-plaza", "2", "2_plazas", "3", "4", "5", "6", "7", "8", "9",
    "10", "11", "12", "13", "14", "frentecabana", "image4", "image5", "image6",
    "image7", "image11", "image14", "image18", "image20", "image21", "image24",
    "images21", "images22", "mami", "pileta", "pileta2", "pingpong", "portada",
    "quincho_chico", "unnamed"
  ];

  const supportedExt = ["webp", "jpg", "jpeg"];
  if (slidesContainer) {
    imageNames.forEach(name => {
      supportedExt.forEach(ext => {
        const img = new Image();
        img.src = `images/${name}.${ext}`;
        img.alt = name.replace(/_/g, ' ');
        img.onload = () => {
          if (!slidesContainer.querySelector(`img[src="${img.src}"]`)) {
            slidesContainer.appendChild(img);
            images = document.querySelectorAll('.slides img, .slides video');
            initLightbox();
          }
        };
      });
    });
  }
});

// ========== Iconos para Servicios ==========
(function(){
  const list = document.querySelector('.services-list');
  if(!list) return;

  const ICONS = {
    wifi: '<svg viewBox="0 0 24 24"><path d="M12 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-7-6 1.4 1.4A9 9 0 0 1 12 11a9 9 0 0 1 5.6 2.4L19 12a11 11 0 0 0-14 0Zm-3-3 1.4 1.4A14 14 0 0 1 12 7a14 14 0 0 1 8.6 3.4L22 9a16 16 0 0 0-20 0Z"/></svg>',
    cocher: '<svg viewBox="0 0 24 24"><path d="M3 18v-6l2-6h14l2 6v6h-1a2 2 0 0 1-4 0H8a2 2 0 0 1-4 0H3Zm4.2-8h9.6l-1-3H8.2l-1 3Z"/></svg>',
    pileta: '<svg viewBox="0 0 24 24"><path d="M6 3h2v5h8V3h2v18h-2v-3H8v3H6V3Zm2 10h8v-3H8v3Z"/></svg>',
    quincho: '<svg viewBox="0 0 24 24"><path d="M3 11 12 3l9 8v2H3v-2Zm2 3h14v7H5v-7Z"/></svg>',
    aire: '<svg viewBox="0 0 24 24"><path d="M3 7h18v4H3V7Zm0 6h18v4H3v-4Z"/></svg>',
    calef: '<svg viewBox="0 0 24 24"><path d="M12 2 8 8h3v8l5-6h-3z"/></svg>',
    ropa: '<svg viewBox="0 0 24 24"><path d="M9 3h6l1 3-3 2v11H8V8L5 6l1-3h3Z"/></svg>',
    tv:   '<svg viewBox="0 0 24 24"><path d="M3 5h18v12H3V5Zm6 14h6v2H9v-2Z"/></svg>',
    cocina:'<svg viewBox="0 0 24 24"><path d="M3 5h18v6H3V5Zm0 8h18v6H3v-6Z"/></svg>',
    patio: '<svg viewBox="0 0 24 24"><path d="M3 20h18v2H3v-2Zm2-2h14l-7-8-7 8Z"/></svg>',
    jardin:'<svg viewBox="0 0 24 24"><path d="M4 20h16v-2H4v2Zm8-16 5 5h-3v5h-4V9H7l5-5Z"/></svg>'
  };

  [...list.querySelectorAll('li')].forEach(li=>{
    const t = (li.textContent || '').toLowerCase();
    let key = null;
    if(t.includes('wi-fi')||t.includes('wifi')) key='wifi';
    else if(t.includes('cocher')) key='cocher';
    else if(t.includes('pileta')) key='pileta';
    else if(t.includes('quincho')) key='quincho';
    else if(t.includes('aire')) key='aire';
    else if(t.includes('calef')) key='calef';
    else if(t.includes('ropa')) key='ropa';
    else if(t.includes('smart tv')||t.includes('cable')) key='tv';
    else if(t.includes('cocina')) key='cocina';
    else if(t.includes('patio')) key='patio';
    else if(t.includes('jard')) key='jardin';

    if(key){
      const span = document.createElement('span');
      span.className='ico';
      span.innerHTML = ICONS[key];
      li.prepend(span);
    }
  });
})();