document.addEventListener('DOMContentLoaded', function() {
    // Existing functionality: Handle service image click
    const services = document.querySelectorAll('.service-item');
    let currentBox = null; // Track currently open description box

    services.forEach(item => {
        item.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event from bubbling up to document

            const serviceName = this.querySelector('h3').textContent;
            const serviceDescription = getServiceDescription(serviceName);

            // Remove the old box if it exists
            if (currentBox) {
                currentBox.remove();
                currentBox = null;
            }

            // Create a new box
            const box = document.createElement('div');
            box.classList.add('service-description-box');
            box.style.backgroundColor = '#333'; 
            box.style.color = '#fff';
            box.style.padding = '10px';
            box.style.marginTop = '20px';
            box.style.borderRadius = '8px';
            box.style.width = '50%'; 
            box.style.maxWidth = '90%'; 
            box.style.position = 'absolute'; 
            box.style.top = `${item.offsetTop + item.offsetHeight + 20}px`; 
            box.style.left = '50%'; 
            box.style.transform = 'translateX(-50%)'; 

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

    // Google Sign-In initialization
    window.onload = function () {
        google.accounts.id.initialize({
            client_id: "YOUR_GOOGLE_CLIENT_ID",  // Replace with your actual client ID
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.querySelector(".g_id_signin"),
            { theme: "outline", size: "medium" }  // Customize button appearance
        );
    };

    // Handle the Google Sign-In response
function handleCredentialResponse(response) {
    const jwtToken = response.credential;
    console.log("Encoded JWT ID token: " + jwtToken);

    // Send the token to your server for validation and to create a session
    fetch('/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: jwtToken })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Save session token or any other user data (such as user ID) to localStorage
            localStorage.setItem('userSession', data.sessionToken);
            console.log('User signed in successfully!');
        } else {
            console.error('Sign-in failed:', data.message);
        }
    })
    .catch(error => console.error('Error during authentication:', error));
}


document.getElementById('sign-in-btn').addEventListener('click', function() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    // Sign in with Firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in successfully
        var user = userCredential.user;
        alert("Signed in as: " + user.email);
        // Redirect to your home page or dashboard
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Error: " + errorMessage);
      });
  });
  
  document.getElementById('sign-up-btn').addEventListener('click', function() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    // Sign up with Firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
  
        // Create user data in Firestore
        firebase.firestore().collection("users").doc(user.uid).set({
          email: user.email,
          createdAt: new Date(), // Store the sign-up date
          profile: {
            name: "", // Initialize with empty value, can be updated later
            address: ""
          }
        }).then(() => {
          console.log("User data saved to Firestore.");
          alert("Account created and data saved!");
          // Redirect to your home page or dashboard
        }).catch((error) => {
          console.error("Error saving user data: ", error);
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Error: " + errorMessage);
      });
  });
  

  
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    // Existing sign-in code here
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error with persistence: ", errorMessage);
  });


});
