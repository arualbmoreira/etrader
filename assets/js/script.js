document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data (username and password)
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Create an object with the username and password
        const formData = { username, password};

        // Send form data to the server for login
        fetch('http://localhost:2222/users', { // Update the port number to match your server's port
            method: 'POST', // Use POST method
            headers: {
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: JSON.stringify(formData) // Convert data to JSON format
        })
        .then(response => {
            // Check if the response status is OK (200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse response JSON
            return response.json();
        })
        .then(data => {
            console.log('Login response:', data);
            // Check login response and handle accordingly
            if (data.success) {
                // Login successful
                // Redirect user to dashboard or another page
                window.location.href = '/dashboard.html'; // Example: redirect to dashboard page
            } else {
                // Login failed
                // Display error message to the user
                alert('Invalid username or password. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            // Handle error (e.g., show error message to user)
            alert('An error occurred while logging in. Please try again later.');
        });
    }

    // Add event listener to form submission
    document.getElementById('loginForm').addEventListener('submit', handleSubmit);
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch user data from the server
    fetch('http://localhost:2222/users')
        .then(response => {
            // Check if the response status is OK (200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse response JSON
            return response.json();
        })
        .then(data => {
            // Render user data in the HTML page
            const userList = document.getElementById('userList');
            data.forEach(user => {
                const userElement = document.createElement('div');
                userElement.innerHTML = `
                    <p>ID: ${user.id}</p>
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                    <p>Password: ${user.password}</p>
                `;
                userList.appendChild(userElement);
            });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
});