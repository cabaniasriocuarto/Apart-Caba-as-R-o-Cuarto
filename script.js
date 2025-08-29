/*
 * Simple slider and lightbox functionality for the gallery section.
 * This script handles previous/next navigation through the gallery slides
 * and opens an overlay when an image is clicked to view it enlarged.
 */

document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.querySelector('.slides');
  const images = document.querySelectorAll('.slides img');
  const prevButton = document.querySelector('.slider .prev');
  const nextButton = document.querySelector('.slider .next');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox .close');

  let currentIndex = 0;
  const totalSlides = images.length;

  /**
   * Update the transform on the slides container to show the given index.
   * Uses modulo arithmetic to wrap around at either end.
   * @param {number} index
   */
  function showSlide(index) {
    if (index < 0) {
      index = totalSlides - 1;
    }
    if (index >= totalSlides) {
      index = 0;
    }
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  // Event listeners for navigation buttons
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      showSlide(currentIndex - 1);
    });
  }
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      showSlide(currentIndex + 1);
    });
  }

  // Open the lightbox when any image is clicked
  images.forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });

  // Close the lightbox when the close icon is clicked
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  }

  // Also close the lightbox when clicking outside the image
  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }

  // Event tracking for WhatsApp floating button
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', () => {
      // Push event to GA4 via gtag if available
      if (typeof gtag === 'function') {
        gtag('event', 'clic_whatsapp_flotante', {
          'event_category': 'Interacción',
          'event_label': 'Botón WhatsApp flotante'
        });
      }
      // Push event to GTM dataLayer
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'clic_whatsapp_flotante' });
      }
    });
  }

  // Event tracking for WhatsApp button on the contact page
  const contactWhatsapp = document.querySelector('.contact-form .social-button.whatsapp');
  if (contactWhatsapp) {
    contactWhatsapp.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'clic_whatsapp_contacto', {
          'event_category': 'Interacción',
          'event_label': 'WhatsApp en contacto'
        });
      }
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'clic_whatsapp_contacto' });
      }
    });
  }

  // Event tracking for form submission on the contact page
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      // Registro de evento para GA4 y GTM
      if (typeof gtag === 'function') {
        // Evento personalizado para envío de formulario
        gtag('event', 'enviar_formulario', {
          'event_category': 'Interacción',
          'event_label': 'Formulario de contacto'
        });
        // Disparar un evento de conversión genérico que pueda asociarse a Google Ads/Analytics
        gtag('event', 'conversion', {
          'send_to': 'G-1ZEE3XF0SP',
          'event_category': 'Formulario',
          'event_label': 'Reserva completada'
        });
      }
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'enviar_formulario' });
        // También enviar un evento de conversión al DataLayer para Tag Manager
        window.dataLayer.push({ event: 'conversion' });
      }
    });
  }
});