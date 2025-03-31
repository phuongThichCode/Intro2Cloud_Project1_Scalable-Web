const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    const json = [
            {
                title: "Post 1",
                content: "Deserunt veniam et tempor officia. Eu est elit ea tempor sint. Mollit consequat pariatur incididunt aute sint sit veniam. Ex tempor ipsum voluptate culpa qui do nulla fugiat velit laboris. Cillum nulla labore veniam laboris sint. Et nisi duis culpa deserunt enim ad.",
                published_date: "2023-10-01T00:00:00Z",
                updated_date: "2023-10-02T00:00:00Z"
            },
            {
                title: "Post 2",
                content: "Proident non nisi Lorem officia incididunt aliquip nostrud mollit. Est ipsum fugiat aliqua Lorem sit ullamco. Adipisicing voluptate quis Lorem in ea ea qui enim id reprehenderit consequat. Excepteur quis do proident sunt deserunt nisi. Do sint culpa tempor ea ad anim culpa tempor.",
                published_date: "2023-10-03T00:00:00Z",
                updated_date: "2023-10-04T00:00:00Z"
            }
        ]

    res.json(json);
});

module.exports = router;