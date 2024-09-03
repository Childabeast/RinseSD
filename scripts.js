document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const displayImage = document.getElementById('display-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const newSrc = this.src.replace('150', '600x400'); // Adjust based on actual image sizes
            displayImage.src = newSrc;
        });
    });

    flatpickr("#calendar", {
        dateFormat: "Y-m-d",
        minDate: "today",
    });
});
