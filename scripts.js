document.addEventListener('DOMContentLoaded', function() {
    // Open modal
    const bookingModal = document.getElementById('bookingModal');
    const openModalBtn = document.getElementById('openBookingModal');
    const closeModalBtn = document.getElementById('closeModal');

    openModalBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent link from navigating away
        bookingModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', function() {
        bookingModal.style.display = 'none';
    });

    // Close modal when clicking outside content
    window.addEventListener('click', function(event) {
        if (event.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
    });

    // Flatpickr calendar setup
    flatpickr("#calendar", {
        dateFormat: "Y-m-d",
        minDate: "today",
    });

    // Handle service image click
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
});
