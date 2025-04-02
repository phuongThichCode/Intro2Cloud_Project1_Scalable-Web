const server_url = "http://localhost:3001/api/posts";
const post_color_pallete = [
    "#ffccff",
    "#cce6ff",
    "#ccffcc",
    "#d1d1e0",
    "#ffffcc"
]

fetchData().then(data => {
    loadData(data);
})

async function fetchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");
    try {
        const response = await fetch(`${server_url}/${postId}`);
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

function loadData(post) {
    const template = document.querySelector('#blog-post-template');
    const container = document.querySelector('#main-container');

    const clone = template.content.cloneNode(true);
    clone.querySelector("#main-blog-title").textContent = post.title;
    clone.querySelector("#main-blog-content").textContent = post.content;

    const published_date = clone.querySelector("#main-blog-published-date");
    published_date.textContent = Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(new Date(post.published_date));
    published_date.setAttribute("datetime", post.published_date);

    const updated_date = clone.querySelector("#main-blog-updated-date");
    updated_date.textContent = Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(new Date(post.updated_date));
    updated_date.setAttribute("datetime", post.updated_date);

    clone.querySelector(".blog-edit-link").setAttribute('href', `./edit.html?id=${post.post_id}`);

    container.appendChild(clone);
}

function onSaveButtonClicked(){

}

function onCancelButtonClicked(){
    window.location.href = "./index.html";
}

function onSearchSubmit(event) {
    event.preventDefault();
    const query = document.querySelector("#search-input").value;
    // redirect to home page with search query
    window.location.href = `./index.html?value=${query}`;
}