const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    const json = {
        array: [
            {
                title: "Post 1",
                content: "Content of post 1",
                published_date_string: "2023-10-01",
                published_date: "2023-10-01T00:00:00Z",
                last_update_date_strings: "2023-10-02",
                last_update_date: "2023-10-02T00:00:00Z"
            },
            {
                title: "Post 2",
                content: "Content of post 2",
                published_date_string: "2023-10-03",
                published_date: "2023-10-03T00:00:00Z",
                last_update_date_strings: "2023-10-04",
                last_update_date: "2023-10-04T00:00:00Z"
            }
        ]
    }

    res.json(json);
});

module.exports = router;