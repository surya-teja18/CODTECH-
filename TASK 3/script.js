// Example of using fetch to interact with the backend
const apiUrl = 'http://localhost:5000/api/posts';

// Fetch and display posts on index.html
async function fetchPosts() {
    const response = await fetch(apiUrl);
    const posts = await response.json();
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = posts.map(post => `
        <div>
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <a href="post.html?id=${post._id}">Read More</a>
        </div>
    `).join('');
}

fetchPosts();
