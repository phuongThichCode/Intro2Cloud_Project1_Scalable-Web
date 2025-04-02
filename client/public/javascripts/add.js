const server_url = "http://localhost:3001/api/posts";

async function onPostSubmitted(event){
    event.preventDefault();

    const newPost = {
        title: event.target.querySelector(".blog-title-edit").value,
        content: event.target.querySelector(".blog-content-edit").value
    }

    try {
        const response = await fetch(`${server_url}`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(newPost)
        });
        if (response.ok){
            const result = await response.json();
            if (result.ok){
                const post = result.data;
                window.location.href = `./post.html?id=${post.post_id}`;
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
    window.location.href = `./index.html`;
}

function onSearchSubmit(event) {
    event.preventDefault();
    const query = document.querySelector("#search-input").value;
    // redirect to home page with search query
    window.location.href = `./index.html?value=${query}`;
}