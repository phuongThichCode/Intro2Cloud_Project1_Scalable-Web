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
        if (response.ok) {
            const result = await response.json();
            return result;
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
    clone.querySelector(".blog-title-edit").value = post.title;
    clone.querySelector(".blog-content-edit").textContent = post.content;

    const published_date = clone.querySelector(".blog-published-date");
    published_date.textContent = Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(new Date(post.published_date));
    published_date.setAttribute("datetime", post.published_date);

    const rand = Math.random();
    const color = post_color_pallete[Math.floor(rand * post_color_pallete.length)];
    console.log(Math.floor(rand * post_color_pallete.length), color);
    clone.querySelector(".blog-post").style.backgroundColor = color;

    container.appendChild(clone);
}

function onSaveButtonClicked(){

}

function onCancelButtonClicked(){
    window.location.href = "./index.html";
}