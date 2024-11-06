// Function to simulate a 5-second delay using a callback
function simulateDelay(callback) {
    setTimeout(function () {
        callback(); // Execute the callback after 5 seconds
    }, 5000);
}

// Function to fetch posts from the API
function fetchPosts(callback) {
    fetch('https://dummyjson.com/posts')
        .then(response => response.json())  // Convert response to JSON
        .then(data => {
            callback(null, data.posts); // Call the callback with fetched posts
        })
        .catch(error => {
            callback('Failed to fetch posts: ' + error.message, null); // Call callback with error message
        });
}

// Add event listener to the button
document.getElementById('triggerButton').addEventListener('click', function () {
    // Display a loading message
    document.getElementById('output').innerText = "Please wait...";  // Display the loading message

    // Simulate the delay and fetch posts
    simulateDelay(function () {
        fetchPosts(function (error, posts) {
            if (error) {
                document.getElementById('output').innerText = error;  // If there is an error, show the error message
            } else {
                // Display fetched posts (limit to first 5 posts)
                let output = posts.slice(0, 5)  // Limit to first 5 posts
                    .map(post => `<p>${post.title}</p>`)
                    .join('');
                document.getElementById('output').innerHTML = output;  // Insert the fetched post titles
            }

            // Ensure the output div is visible after content is loaded
            document.getElementById('output').style.display = 'block';
        });
    });
});
