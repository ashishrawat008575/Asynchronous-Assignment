document.getElementById('asyncButton').addEventListener('click', async function() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerText = "Loading...Please wait";

    try {
        const response = await fetch('https://dummyjson.com/posts');
        if (!response.ok) throw new Error("Failed to fetch data.");
        const data = await response.json();
        const titles = data.posts.map(post => post.title).join('<br>');
        outputDiv.innerHTML = titles;
    } catch (error) {
        outputDiv.innerText = "Error: " + error.message;
    }
});

// Scroll to top button functionality
const scrollButton = document.getElementById('scrollButton');
const outputDiv = document.getElementById('output');

// Show or hide the scroll button based on scroll position
outputDiv.addEventListener('scroll', function() {
    if (outputDiv.scrollTop > 100) {
        scrollButton.style.display = 'block'; // Show button when scrolled down
    } else {
        scrollButton.style.display = 'none'; // Hide button when near top
    }
});

// Scroll the output div back to the top when the button is clicked
scrollButton.addEventListener('click', function() {
    outputDiv.scrollTop = 0;
});
