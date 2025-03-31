const server_url = "http://localhost:3001/api/posts";

async function fetchData() {
    try {
        const response = await fetch(server_url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

function loadData(data) {
    const template = document.querySelector('#blog-post-template');
    const container = document.querySelector('#main-container');

    console.log(data);

    data.array.forEach(post => {
        let clone = template.content.cloneNode(true);
        clone.querySelector(".title").textContent = post.title;
        clone.querySelector(".content").textContent = post.content;
        
        let published_date = clone.querySelector(".published-date");
        published_date.textContent = post.published_date_string;
        published_date.setAttribute("datetime", post.published_date);

        let last_update_date = clone.querySelector(".last-update-date");
        last_update_date.textContent = post.last_update_date_strings;
        last_update_date.setAttribute("datetime", post.last_update_date);

        container.appendChild(clone);
    });
}

// loadData("a")
fetchData().then(data => {
    loadData(data);
})