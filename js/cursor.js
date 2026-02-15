/**
 * Simplified Cursor Animation: Rotating Hollow Star
 * Follows the visible default cursor with a smooth LERP effect.
 */

(function () {
    // Only enable on desktop
    if (window.innerWidth <= 991) return;

    // Create cursor elements
    const starContainer = document.createElement('div');
    starContainer.id = 'cursor-star-container';

    const star = document.createElement('div');
    star.id = 'cursor-star';
    star.innerHTML = '☆'; // Hollow star character

    starContainer.appendChild(star);
    document.body.appendChild(starContainer);

    // Ensure the default cursor is visible (remove class if it was there)
    document.body.classList.remove('custom-cursor-active');
    starContainer.style.display = 'flex';

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animation loop for LERP
    function animate() {
        const lerp = 0.1; // Smoothness factor

        cursorX += (mouseX - cursorX) * lerp;
        cursorY += (mouseY - cursorY) * lerp;

        // Translate3d for GPU acceleration - centering the star on the mouse tip
        starContainer.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animate);
    }

    animate();

})();
