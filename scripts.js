document.addEventListener('DOMContentLoaded', function() {
    // Handle service image click
    const services = document.querySelectorAll('.service-item');
    let currentBox = null; // Track currently open description box

    services.forEach(item => {
        item.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event from bubbling up to document

            console.log('Service item clicked'); // Debug log

            const serviceName = this.querySelector('h3').textContent;
            console.log('Service name:', serviceName); // Debug log

            const serviceDescription = getServiceDescription(serviceName);

            // Remove the old box if it exists
            if (currentBox) {
                currentBox.remove();
                currentBox = null;
            }

            // Create a new box
            const box = document.createElement('div');
            box.classList.add('service-description-box');
            box.style.backgroundColor = '#333'; // Dark gray background
            box.style.color = '#fff';
            box.style.padding = '10px';
            box.style.marginTop = '20px';
            box.style.borderRadius = '8px';
            box.style.width = '50%'; // Make it more compact
            box.style.maxWidth = '90%'; // Responsive width
            box.style.position = 'absolute'; // Absolute positioning
            box.style.top = `${item.offsetTop + item.offsetHeight + 20}px`; // Position below the clicked service
            box.style.left = '50%'; // Center horizontally
            box.style.transform = 'translateX(-50%)'; // Center horizontally

            const title = document.createElement('h3');
            title.textContent = serviceName;
            title.style.fontWeight = 'bold';
            title.style.margin = '0';
            title.style.color = "#28a745";

            const description = document.createElement('p');
            description.textContent = serviceDescription;
            description.style.margin = '5px 0';

            // Append title and description to the box
            box.appendChild(title);
            box.appendChild(description);

            // Append the box to the body
            document.body.appendChild(box);
            currentBox = box; // Keep track of the current box

            // Close the box if clicked outside
            function handleClickOutside(event) {
                if (!box.contains(event.target) && !item.contains(event.target)) {
                    if (currentBox) {
                        currentBox.remove();
                        currentBox = null;
                    }
                    document.removeEventListener('click', handleClickOutside);
                }
            }
            document.addEventListener('click', handleClickOutside);
        });
    });

    // Function to get a description based on the service name
    function getServiceDescription(serviceName) {
        switch (serviceName) {
            case 'Wash & Wax':
                return 'Get a sparkling clean and protective wax finish for your vehicle.';
            case 'Interior Detailing':
                return 'Thoroughly clean every inch of your car’s interior, leaving it fresh and spotless.';
            case 'The Works':
                return 'A complete service inside and out to rejuvenate your vehicle’s appearance.';
            default:
                return 'Premium detailing service for your vehicle.';
        }
    }

    // Handle 'Book Now' button click to open Setmore in a pop-up
    const bookNowButton = document.querySelector('#book-now-btn');
    bookNowButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        // Show the modal
        const bookingModal = document.getElementById('booking-modal');
        bookingModal.style.display = 'block';

        // Open Setmore booking page in the modal
        const setmoreFrame = document.getElementById('setmore-frame');
        setmoreFrame.innerHTML = '<iframe src="https://benchris.setmore.com" style="width: 100%; height: 600px; border: none;"></iframe>';

        // Close the modal when clicking the close button
        const closeButton = document.querySelector('.close-btn');
        closeButton.addEventListener('click', function() {
            bookingModal.style.display = 'none';
            setmoreFrame.innerHTML = ''; // Clear iframe content when closing
        });

        // Close the modal when clicking outside the modal content
        window.addEventListener('click', function(event) {
            if (event.target == bookingModal) {
                bookingModal.style.display = 'none';
                setmoreFrame.innerHTML = ''; // Clear iframe content when closing
            }
        });
    });
});
