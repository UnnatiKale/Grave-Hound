document.addEventListener('DOMContentLoaded', () => {
    // Create Lightbox Elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img">
        <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    // Add click event to all gallery images
    const galleryImages = document.querySelectorAll('.gallery-grid .product-card img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
            // Try to find a title from sibling elements
            const card = img.closest('.product-card');
            const title = card.querySelector('h3').textContent;
            captionText.textContent = title;
        });
    });

    // Close Lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
});
