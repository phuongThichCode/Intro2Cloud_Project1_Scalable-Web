const server_url = "http://localhost:3001/api/posts";

fetchData().then(data => {
    loadData(data);
})

async function fetchData() {
    try {
        const response = await fetch(server_url);
        if (response.ok){
            const result = await response.json();
            return result;
        }
        throw new Error(`${response.status} ${response.statusText}`);
    } catch (err) {
        console.error("Error fetching data: ", err.message || err);
        return null;
    }
}

function loadData(posts) {
    const template = document.querySelector('#blog-post-template');
    const container = document.querySelector('#main-container');

    posts.forEach(post => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".blog-title").textContent = post.title;
        clone.querySelector(".blog-content").textContent = post.content;
        
        const published_date = clone.querySelector(".blog-published-date");
        published_date.textContent = Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(new Date(post.published_date));
        published_date.setAttribute("datetime", post.published_date);

        const updated_date = clone.querySelector(".blog-updated-date");
        updated_date.textContent = Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(new Date(post.updated_date));
        updated_date.setAttribute("datetime", post.updated_date);

        container.appendChild(clone);
    });
}
