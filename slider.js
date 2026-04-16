document.addEventListener("DOMContentLoaded", () => {
    const paragraphs = document.querySelectorAll('.text-slider p');
    let currentIndex = 0;

    // pokaži prvi paragraf
    paragraphs[currentIndex].classList.add('active');

    setInterval(() => {
        // sakrij trenutni
        paragraphs[currentIndex].classList.remove('active');

        // idemo na sljedeći
        currentIndex = (currentIndex + 1) % paragraphs.length;

        // prikaži novi
        paragraphs[currentIndex].classList.add('active');
    }, 5000); // 5000ms = 5 sekundi
});
