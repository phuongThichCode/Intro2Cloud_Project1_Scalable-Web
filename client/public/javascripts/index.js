const server_url = "http://localhost:3001/api/posts";

const post_color_pallete = [
    "#ffccff",
    "#cce6ff",
    "#ccffcc",
    "#d1d1e0",
    "#ffffcc"
]

function hashStringToColorIndex(str, maxColors) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash + str.charCodeAt(i)) % maxColors; 
    }
    return hash;
}

fetchData().then(data => {
    loadData(data);
})


async function fetchData() {
    try {
        const response = await fetch(server_url);
        if (response.ok){
            const result = await response.json();
            if ('data' in result){
                return result.data;
            }
            throw new Error("Couldn't find data field from response");
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

    posts.forEach((post, index) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".blog-title").textContent = post.title;
        clone.querySelector(".blog-title").setAttribute('href', `./post.html?id=${post.post_id}`);
        const max_length = 100;
        if (post.content.length > max_length){
            clone.querySelector(".blog-content").textContent = post.content.substring(0, max_length) + "...";
        } else {
            clone.querySelector(".blog-content").textContent = post.content;
        }

        const published_date = clone.querySelector(".blog-published-date");
        published_date.textContent = Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(new Date(post.published_date));
        published_date.setAttribute("datetime", post.published_date);

        const color = post_color_pallete[hashStringToColorIndex(post.post_id, post_color_pallete.length)];
        clone.querySelector(".blog-post").style.backgroundColor = color;

        const updated_date = clone.querySelector(".blog-updated-date");
        updated_date.textContent = Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(new Date(post.updated_date));
        updated_date.setAttribute("datetime", post.updated_date);
        
        clone.querySelector(".blog-edit-link").setAttribute('href', `./edit.html?id=${post.post_id}`);

        container.appendChild(clone);
    });
}
