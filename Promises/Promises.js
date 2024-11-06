// Button event listener to trigger data fetching with Promise
document.getElementById('loadPostsBtn').addEventListener('click', function () {
    // Show the output div after the button is clicked
    document.getElementById('output').style.display = 'block';  // Make the output visible

    document.getElementById('output').innerText = "Loading...Please wait"; // Display loading message

    fetchPostsWithTimeout()
        .then(posts => {
            // Once posts are fetched successfully, display them
            const outputDiv = document.getElementById('output');
            if (posts.length === 0) {
                outputDiv.innerText = "No posts found.";
            } else {
                outputDiv.innerHTML = posts.map(post => `<p>${post.title}</p>`).join('');
            }
        })
        .catch(error => {
            // Handle any errors (timeout or fetch failure)
            document.getElementById('output').innerText = error;
        });
});

// Function to fetch posts using Promise with timeout handling
function fetchPostsWithTimeout() {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => reject('Operation timed out'), 5000); // 5-second timeout

        // Fetch posts from the API
        fetch('https://dummyjson.com/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                return response.json();
            })
            .then(data => {
                clearTimeout(timeoutId); // Clear timeout if fetch is successful
                resolve(data.posts); // Resolve the promise with the fetched posts
            })
            .catch(error => {
                clearTimeout(timeoutId); // Clear timeout if fetch fails
                reject('Failed to fetch posts: ' + error.message); // Reject the promise with an error message
            });
    });
}
