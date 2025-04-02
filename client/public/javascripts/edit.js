const server_url = "http://localhost:3001/api/posts";

let postId = "";

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

    postId = post.post_id;

    const clone = template.content.cloneNode(true);
    clone.querySelector(".blog-title-edit").value = post.title;
    clone.querySelector(".blog-content-edit").value = post.content;

    const published_date = clone.querySelector(".blog-published-date");
    published_date.textContent = Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(new Date(post.published_date));
    published_date.setAttribute("datetime", post.published_date);

    container.appendChild(clone);
}

async function onEditSubmitted(event){
    event.preventDefault();

    const editedPost = {
        title: event.target.querySelector(".blog-title-edit").value,
        content: event.target.querySelector(".blog-content-edit").value
    }

    try {
        const response = await fetch(`${server_url}/${postId}`, {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(editedPost)
        });
        if (response.ok){
            const result = await response.json();
            if (result.ok){
                window.location.href = `./post.html?id=${postId}`;
                return;
            } else {
                throw Error(result.error);
            }
        }
        throw new Error(`${response.status} ${response.statusText}`);
    } catch (err) {
        console.error("Error updating data: ", err.message || err);
    }
}

function onCancelButtonClicked(){
    window.location.href = `./post.html?id=${postId}`;
}

async function onDeleteButtonClicked(){
    // if (!confirm("Are you sure you want to delete this post?")) {
    //     return;
    // }

    try {
        const response = await fetch(`${server_url}/${postId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            const result = await response.json();
            if (result.ok) {
                window.location.href = "./index.html";
                return;
            } else {
                throw Error(result.error);
            }
        }
        throw new Error(`${response.status} ${response.statusText}`);
    } catch (err) {
        console.error("Error deleting data: ", err.message || err);
    }
}