// Custom JavaScript for gallery slider, lightbox and tracking events

document.addEventListener('DOMContentLoaded', function () {
  /* ---------------------- Gallery Setup ---------------------- */
  const sliderContainer = document.querySelector('.galeria-slider');
  if (sliderContainer) {
    // Define slides: first video then images
    const slides = [];
    // Video slide as first item
    slides.push({ type: 'video', src: 'video/videoplayback.mp4' });
    // Array of image filenames located in the images folder
    const imageFiles = [
      'frentecabana.jpg',
      'foto1.jpeg',
      'foto2.jpeg',
      'foto3.jpeg',
      'pileta.jpg',
      'pileta2.jpg',
      'pingpong.jpg',
      'quincho_chico.jpg',
      '0.jpg',
      '1.jpg',
      '2.jpg',
      '3.jpg',
      '4.jpg',
      '5.jpg',
      '6.jpg',
      '7.jpg',
      '8.jpg',
      '9.jpg',
      '11.jpg',
      '12.jpg',
      '13.jpg',
      '14.jpg',
      '15.jpg',
      '16.jpg',
      'image4.jpeg',
      'image6.jpeg',
      'image11.jpg',
      'image14.jpg',
      'image18.jpg',
      'image20.jpg',
      'image21.jpg',
      'image24.jpg',
      'images.jpg',
      'images21.jpg',
      'images22.jpg'
    ];
    imageFiles.forEach((file) => {
      slides.push({ type: 'image', src: 'images/' + file });
    });
    // Create slide elements
    slides.forEach((item, index) => {
      const slide = document.createElement('div');
      slide.classList.add('slide');
      if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.src;
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.controls = true;
        video.style.maxHeight = '400px';
        video.style.borderRadius = '8px';
        slide.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = 'Galería imagen';
        slide.appendChild(img);
      }
      // Add click event to open lightbox
      slide.addEventListener('click', function () {
        openLightbox(index);
      });
      sliderContainer.appendChild(slide);
    });
    let currentSlide = 0;
    const slidesDOM = sliderContainer.querySelectorAll('.slide');
    function showSlide(n) {
      // Wrap index
      if (n < 0) currentSlide = slidesDOM.length - 1;
      else if (n >= slidesDOM.length) currentSlide = 0;
      else currentSlide = n;
      // Hide all slides
      slidesDOM.forEach((s, idx) => {
        s.style.display = idx === currentSlide ? 'flex' : 'none';
      });
    }
    // Initial display
    showSlide(currentSlide);
    // Previous and next handlers
    const prevBtn = document.querySelector('.galeria-prev');
    const nextBtn = document.querySelector('.galeria-next');
    prevBtn.addEventListener('click', function () {
      showSlide(currentSlide - 1);
    });
    nextBtn.addEventListener('click', function () {
      showSlide(currentSlide + 1);
    });
    // Lightbox functions
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    const closeBtn = lightbox.querySelector('.close');
    function openLightbox(index) {
      // Clear existing content
      lightboxContent.innerHTML = '';
      const item = slides[index];
      if (item.type === 'video') {
        const vid = document.createElement('video');
        vid.src = item.src;
        vid.controls = true;
        vid.autoplay = true;
        vid.muted = false;
        vid.style.maxHeight = '80vh';
        vid.style.maxWidth = '90%';
        lightboxContent.appendChild(vid);
      } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = '';
        img.style.maxHeight = '80vh';
        img.style.maxWidth = '90%';
        lightboxContent.appendChild(img);
      }
      lightbox.style.display = 'flex';
    }
    closeBtn.addEventListener('click', function () {
      lightbox.style.display = 'none';
      // Pause video if present
      const video = lightboxContent.querySelector('video');
      if (video) {
        video.pause();
      }
    });
  }

  /* ---------------------- Tracking Events ---------------------- */
  // Floating WhatsApp button on index
  const whatsappFloat = document.getElementById('whatsapp-float');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function () {
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'clic_whatsapp_flotante' });
      }
    });
  }
  // Floating WhatsApp button on contact page
  const whatsappFloatContact = document.getElementById('whatsapp-float-contact');
  if (whatsappFloatContact) {
    whatsappFloatContact.addEventListener('click', function () {
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'clic_whatsapp_flotante' });
      }
    });
  }
  // WhatsApp button in contact page header section
  const btnWhatsapp = document.getElementById('btn-whatsapp');
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', function () {
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'clic_whatsapp_contacto' });
      }
    });
  }
  // Contact form submission tracking
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'enviar_formulario' });
      }
    });
  }
});